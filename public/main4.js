const form4 = document.getElementById('vote-form4');

form4.addEventListener('submit', (e) =>{
    const choice = document.querySelector('input[name=pro]:checked').value;
        const data = {pro: choice};

    // fetch('http://localhost:3000/poll4',{
     fetch('https://glacial-reaches-33160.herokuapp.com/poll4',{
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
//  fetch('http://localhost:3000/poll4').then(res => res.json())
fetch('https://glacial-reaches-33160.herokuapp.com/poll4').then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.lenght;

    // Count votes
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.pro] = (acc[vote.pro] || 0) + parseInt(vote.points)), acc), {});
    
    let dataPoints = [
        {label: 'Onyekachi_Umeh', y:voteCounts.Onyekachi_Umeh},
        {label: 'Emmanuel_Egwela', y:voteCounts.Emmanuel_Egwela},
        {label: 'NChinaemelum_Agu', y:voteCounts.Chinaemelum_Agu},
        {label: 'Pascal_Chigbo', y:voteCounts.Pascal_Chigbo},
        
    ];
    
    
    
    
    const chartContainer = document.querySelector('#chartContainer4');
    
    if(chartContainer){
    var chart = new CanvasJS.Chart("chartContainer4", {
            animationEnabled: true,
            theme: 'theme1',
            title: {
                text: `Total Votes For Pro ${totalVotes}`        
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
    
    var channel = pusher.subscribe('2012-set-poll4');
    channel.bind('2012-set-vote4', function(data) {
      dataPoints = dataPoints.map(x =>{
          if(x.label == data.pro) {
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