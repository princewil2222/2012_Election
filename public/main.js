
const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=president]:checked').value;
        const data = {president: choice};

    // fetch('http://localhost:3000/poll',{
    fetch('https://glacial-reaches-33160.herokuapp.com/poll',{
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
// fetch('http://localhost:3000/poll').then(res => res.json())
fetch('https://glacial-reaches-33160.herokuapp.com/poll').then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.lenght;

    // Count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.president] = (acc[vote.president] || 0) + parseInt(vote.points)), acc), {});

    let dataPoints = [
        {label: 'Prince_Nome', y:voteCounts.Prince_Nome},
        {label: 'Chigozie_Egbuaba', y:voteCounts.Chigozie_Egbuaba},
        {label: 'Nonso_Ogbu', y:voteCounts.Nonso_Ogbu},
        {label: 'Ifeanyi_Ejiofobiri', y:voteCounts.Ifeanyi_Ejiofobiri},
        
    ];
    
    
    
    const chartContainer = document.querySelector('#chartContainer');
    
    if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes ${totalVotes}`        
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
    //   encrypted: true
    });
    
    var channel = pusher.subscribe('2012-set-poll');
    channel.bind('2012-set-vote', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.president) {
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

