import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CSS
import '../styles/voteScreenStyle.css';

const VotesScreen = () => {

  // hooks
  // -states
  // ---local
  const [votes, setVotes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/votes').then((res) => {
      console.log(res.data);
      setVotes(res.data);
    });
  }, []);

  // vars
  const ADD_VOTES = 'http://localhost:5000/api/votes/add/';
  const DELETE_VOTES = 'http://localhost:5000/api/votes/delete/';

  // custom Functions
  const submitVote = (e) => {
    e.preventDefault();

    // vars
    // logic
    const userId = e.target.value;
    const value = e.target.className;
    const score = +e.target.name + 1;

    // DOMS
    let div = document.getElementById(`${userId}`);
    
    //objects
    const newVote = { user_id: userId, score: score };

    console.log(userId);
    console.log(value);
    console.log(score);

    if (value === 'up') {
      axios
        .post(ADD_VOTES, newVote)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      return (div.className = 'clickedUp');
    } else if (value === 'down') {
      const deletescore = score - 1;
      console.log(DELETE_VOTES + userId + '/' + deletescore);
      axios
        .delete(DELETE_VOTES + userId + '/' + deletescore)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      return (div.className = 'clickedDown');
    }
  };
  return (
    <>
      <main>
        <h2 className='headline-1'>Go teams! Go!</h2>
        <section className='carsContainer'>
          {votes.map((team) => (
            <div className='teamCard' id={team._id} key={team._id}>
              <img src={team.photo_url} alt={team.name} />
              <h4>{team.name}</h4>
              <p>
                <b>Score before vote: {team.votes.length - 1}</b>
              </p>
              <form className='choiseForm' onClick={submitVote}>
                 {' '}
                <button
                  className='up'
                  value={team._id}
                  name={team.votes.length - 1}
                >
                  UP
                </button>
                 {' '}
                <button
                  className='down'
                  value={team._id}
                  name={team.votes.length - 1}
                >
                  DOWN
                </button>
              </form>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default VotesScreen;
