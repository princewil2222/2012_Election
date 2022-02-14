
const form1 = document.getElementById('vote-form1');

form1.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=vpresident]:checked').value;
        const data = {vpresident: choice};

    // fetch('http://localhost:3000/poll1',{
    fetch('https://glacial-reaches-33160.herokuapp.com/poll1',{
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
//  fetch('http://localhost:3000/poll1').then(res => res.json())
fetch('https://glacial-reaches-33160.herokuapp.com/poll1').then(res => res.json())
.then(data => {
 const votes = data.votes;
 const totalVotes = votes.lenght;

    // Count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.vpresident] = (acc[vote.vpresident] || 0) + parseInt(vote.points)), acc), {});
    
    let dataPoints = [
        {label: 'Okwunna_Ezulike', y:voteCounts.Okwunna_Ezulike},
        {label: 'Onyebuchi_Ikemba', y:voteCounts.Onyebuchi_Ikemba},
        {label: 'Chibueze_Chukwuemeka', y:voteCounts.Chibueze_Chukwuemeka},
        {label: 'Adaeze_Okonkwo', y:voteCounts.Adaeze_Okonkwo},
        
    ];
    
    const chartContainer = document.querySelector('#chartContainer1');
    
    if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer1", {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes For V-President ${totalVotes}`       
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
    
    var channel = pusher.subscribe('2012-set-poll1');
    channel.bind('2012-set-vote1', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.vpresident) {
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




    