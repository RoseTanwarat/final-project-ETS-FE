<template>
    <div id="quiz">
        <h1 class="heading">Quiz</h1>
        <div class="wrapper">
            <label>Title Quiz : </label>
            <input type="text" class="input-title" v-model="messageTitle"><br>
        </div>
        <div v-for="(question, index) in questions" :key="index">
            <div v-if="question.type && question.type ==='choice'" class="checkbox">
                <div>
                    <label>Question {{index+1}} : <input type="text" class="question"
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
                    <span>Picked : {{question.answer}} </span>
                </div>
            </div>
            <div v-else>
                <div>
                    <label>Question {{index+1}} : <input type="text" class="question" v-model="question.title"></label>
                    <label>Ans : <input type="text" class="ans" v-model="question.answer">{{answer}}</label>
                </div>
            </div>
        </div>

        <label>Score : <input type="text" class="score"></label>
        <button class="btn"> Submit</button>

    </div>
</template>

<script>
export default {
    name: 'QuizPageTeacher',
    data() {
        return {
            messageTitle: "Top Tutorials",
            questions: [{
                title: "HTML Tutorial",
                answer: "",
                type: "text",
            },
            {
                title: "CSS Tutorial",
                answer: "",
                type: "choice",
            },
            {
                title: "CSS Tutorial",
                answer: "",
                type: "choice",

            },
            {
                title: "HTML Tutorial",
                answer: "",
                type: "text"
            }]
        }
    },
    computed: {
        isRoute() {
            return this.$route
        },
        quizId() {
            return this.$route.params.quizId
        }
    },
    methods: {
        addQues: function () {
            this.questions.push({
                title: "",
                answer: "",
                type: "text"
            })
        },
        remove: function (index) {
            this.questions.splice(index, 1)

        },

    },
}

</script>