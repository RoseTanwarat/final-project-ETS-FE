<template>
    <div id="Score">
        <h1>Score</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Quiz</th>
                    <th>Student </th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="score in scores" :key="score.id">
                    <td>{{ score.quiz?.quiz_title }}</td>
                    <td>{{ score.student?.email }}</td>
                    <td>{{ score.student_score }}</td>
                </tr>
            </tbody>
        </table><br>
        <!-- <lable>Max Score: {{ maxScore }}</lable><br>
        <lable>Min Score: {{ minScore }}</lable><br> -->
        <div>
            <h4>Average Score: {{ avgScore }}</h4>
        </div>


    </div>
</template>

<script>
import Score from '@/models/Score'
//import Quiz from '@/models/Quiz'
export default {
    name: "ScorePage",
    data() {
        return {
            score: '',
            avgScore: '',
        }
    },
    computed: {
        scores() {
            return Score.query().with('quiz').with('student').get();
        }

    },
    methods: {
        avg() {
            let sum = 0;
            let avg = 0;
            this.scores.forEach(item => {
                console.log(item.student_score);
                sum += item.student_score
                avg = sum / this.scores.length;
            })
            console.log(sum);
            console.log(avg);
            this.avgScore = avg.toFixed(3)
        }
    },
    async mounted() {
        await Score.api().getScores()
        this.avg()
    }

}
</script>