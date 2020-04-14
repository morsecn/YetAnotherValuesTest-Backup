$(document).ready(function () {  // Use closure, no globals
    let scores;
    let current_question = 0;

    initialize();

    function initialize(){
        scores = new Array(questions.length).fill(0);
        // Shuffle Quesions
        questions.sort(() => Math.random() - 0.5);

        $("#btn-strongly-positive")
            .click(()=>{ scores[current_question] = +1.0; next_question() });
        $("#btn-positive")          
            .click(()=>{ scores[current_question] = +0.5; next_question() });
        $("#btn-uncertain")        
            .click(()=>{ scores[current_question] =  0.0; next_question() });
        $("#btn-negative")         
            .click(()=>{ scores[current_question] = -0.5; next_question() });
        $("#btn-strongly-negative")
            .click(()=>{ scores[current_question] = -1.0; next_question() });

        $("#btn-prev").click(()=>{ prev_question() });

        render_question();
    }

    function render_question() {
        $("#question-text").html(questions[current_question].question);
        $("#question-number").html(`第 ${current_question + 1} 题 剩余 ${questions.length - current_question - 1} 题`);
        if (current_question == 0) {
            $("#btn-prev").attr("disabled");
        } else {
            $("#btn-prev").removeAttr("disabled");
        }
    }

    function next_question() {
        if (current_question < questions.length - 1) {
            current_question++;
            render_question();
        } else {
            results();
        }
    }

    function prev_question() {
        if (current_question != 0) {
            current_question--;
            render_question();
        }

    }

    function results() {
        let score = {econ: 0, dipl: 0, govt: 0, scty: 0, envo: 0};
        let max_score = {...score};
        for (let i = 0; i < scores.length; i += 1 ) {
            for (let key of Object.keys(score)){
                score[key] += scores[i] * questions[i].effect[key];
                max_score[key] += Math.abs(questions[i].effect[key]);
            }    
        }

        for (let key of Object.keys(max_score)){
            score[key] = (score[key] + max_score[key]) / (2*max_score[key]);
            score[key] = Math.round(score[key] * 100);
        }  
        location.href = "results.html?" + $.param(score); 
    }
});
