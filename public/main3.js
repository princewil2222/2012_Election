const form3 = document.getElementById('vote-form3');

form3.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=fsec]:checked').value;
        const data = {fsec: choice};

    // fetch('http://localhost:3000/poll3',{
    fetch('https://glacial-reaches-33160.herokuapp.com/poll3',{
        method:'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));



    e.preventDefault();

});
//  fetch('http://localhost:3000/poll3').then(res => res.json())
fetch('https://glacial-reaches-33160.herokuapp.com/poll3').then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.lenght;

    // Count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.fsec] = (acc[vote.fsec] || 0) + parseInt(vote.points)), acc), {});
    
    let dataPoints = [
        {label: 'Stanley_Ugwu', y:voteCounts.Stanley_Ugwu},
        {label: 'Oluchukwu_Obi', y:voteCounts.Oluchukwu_Obi},
        {label: 'Chioma_Obi', y:voteCounts.Chioma_Obi},
        {label: 'Oluchukwu_Nnodu', y:voteCounts.Oluchukwu_Nnodu},
        
    ];
    
    
    
    
    const chartContainer = document.querySelector('#chartContainer3');
    
    if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer3", {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes For FinSec ${totalVotes}`        
        },
        data: [              
        {
            // Change type to "doughnut", "line", "splineArea", etc.
            type: "column",
            dataPoints: dataPoints
        }
        ]
    });
    chart.render();
    
    // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
    
    var pusher = new Pusher('5a354b4c538d4081acd9', {
      cluster: 'eu',
      encrypted: true
    });
    
    var channel = pusher.subscribe('2012-set-poll3');
    channel.bind('2012-set-vote3', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.fsec) {
              x.y += data.points;
              return x;
    
          } else{
              return x;
          }
      });
      chart.render();
    });
  };

 

});