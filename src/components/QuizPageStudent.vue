<template>
    <div v-if="this.quiz" id="quiz">
        <div>
            <button class="btn">
                <router-link to="/home-student">Back</router-link>
            </button>
        </div><br>
        <h1 class="heading">Quiz</h1>
        <div class="wrapper">
            <label>Title Quiz : {{ this.quiz.quiz_title }}</label>
            <!-- <input type="text" class="input-title" v-model="messageTitle"><br> -->
        </div><br>

        <div v-for="(question, index) in questions" :key="question.id">
            <div class="name">
                Question {{ index + 1 }}: {{ question.question_name }}
            </div>
            <input v-if="question.question_type === 'text'" type="text" v-model="question.input">
            <div v-else>
                <input type="radio" v-model="question.input" :value="question.question_choice1" name="choice">
                <label>{{ question.question_choice1 }}</label><br>
                <input type="radio" v-model="question.input" :value="question.question_choice2" name="choice">
                <label>{{ question.question_choice2 }}</label><br>
                <input type="radio" v-model="question.input" :value="question.question_choice3" name="choice">
                <label>{{ question.question_choice3 }}</label><br>
            </div>

        </div>



        <!-- <div v-for="(question, index) in questions" :key="index">
            <div v-if="question.type && question.type === 'choice'" class="checkbox">
                <div>
                    <label>Question {{ index + 1 }} : <input type="text" class="question"
                            v-model="question.title"></label><br>
                    <input type="radio" id="one" value="One" v-model="question.answer">
                    <label for="one">One </label><br>
                    <br>
                    <input type="radio" id="two" value="Two" v-model="question.answer">
                    <label for="two">Two</label><br>
                    <br>
                    <input type="radio" id="three" value="Three" v-model="question.answer">
                    <label for="three">Three</label><br>
                    <br>
                    <span>Picked : {{ question.answer }} </span>
                </div>
            </div>
            <div v-else>
                <div>
                    <label>Question {{ index + 1 }} : <input type="text" class="question"
                            v-model="question.title"></label>
                    <label>Ans : <input type="text" class="ans" v-model="question.answer">{{ answer }}</label>
                </div>
            </div>
        </div> -->

        <!-- <label>Score : <input type="text" class="score"></label> -->
        <button class="btn" @click="submit()"> Submit</button><br>
        <h3 class="total_score">Total Score : {{ totalScore }} </h3>



    </div>
</template>

<script>
import Question from '@/models/Question'
import Quiz from '@/models/Quiz'
import Score from '@/models/Score'
//import User from "../models/User"
export default {
    name: 'QuizPageTeacher',
    data() {
        return {
            title: "",
            question: "",
            totalScore: ''
            // messageTitle: "Top Tutorials",
            // questions: [{
            //     title: "HTML Tutorial",
            //     answer: "",
            //     type: "text",

            // },
            // {
            //     title: "CSS Tutorial",
            //     answer: "",
            //     type: "choice",
            // },
            // {
            //     title: "CSS Tutorial",
            //     answer: "",
            //     type: "choice",

            // },
            // {
            //     title: "HTML Tutorial",
            //     answer: "",
            //     type: "text"
            // }]
        }
    },
    computed: {
        isRoute() {
            return this.$route
        },
        quizId() {
            return this.$route.params.quizId
        },
        quiz() {
            return Quiz.query().where('id', parseInt(this.quizId)).first();
        },
        questions() {
            return Question.query().where('quiz_id', (item) => item == this.quizId).get()
        }

    },
    methods: {
        async submit() {
            let sum = 0;
            this.questions.forEach(item => {
                if (!item.input) {
                    return alert('fill all the fields')
                } else {
                    // console.log('i do =', item.input);
                    // console.log('answer =', item.question_ans);
                    if (item.input === item.question_ans) {
                        console.log('คะเเนนข้อนี้ =', item.question_score);
                        sum += item.question_score

                    } else {
                        console.log('คะเเนนข้อนี้ = no points');
                    }
                }
            })
            console.log(sum);
            this.totalScore = sum
            console.log(document.cookie)
            const idUser = document.cookie.split(" ")[1].split('=')[1]
            console.log(idUser)
            const postScore = await Score.api().postScores({
                student_score: this.totalScore,
                quiz: this.quiz.id,
                student: idUser
            })
            console.log(postScore);


        },

    },
    async mounted() {
        await Quiz.api().getQuizById(this.quizId)

    }
}

</script>