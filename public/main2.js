const form2 = document.getElementById('vote-form2');

form2.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=sec]:checked').value;
        const data = {sec: choice};

    // fetch('http://localhost:3000/poll2',{
    fetch('https://glacial-reaches-33160.herokuapp.com/poll2',{
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
//  fetch('http://localhost:3000/poll2').then(res => res.json())
fetch('https://glacial-reaches-33160.herokuapp.com/poll2').then(res => res.json())
.then(data => {
 const votes = data.votes;
 const totalVotes = votes.lenght;

    // Count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.sec] = (acc[vote.sec] || 0) + parseInt(vote.points)), acc), {});
    
    let dataPoints = [
        {label: 'Ogoma_Ikegwuonu', y:voteCounts.Ogoma_Ikegwuonu},
        {label: 'Ebere_Okonkwo', y:voteCounts.Ebere_Okonkwo},
        {label: 'Chikosoro_Okonkwo', y:voteCounts.Chikosoro_Okonkwo},
        {label: 'Jenifer_Ejiofobiri', y:voteCounts.Jenifer_Ejiofobiri},
        
    ];
    
    const chartContainer = document.querySelector('#chartContainer2');
    
    if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes For Secratary ${totalVotes}`       
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
    
    var channel = pusher.subscribe('2012-set-poll2');
    channel.bind('2012-set-vote2', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.sec) {
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


