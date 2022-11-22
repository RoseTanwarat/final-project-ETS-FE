<template>
    <div id="quiz">
        <h1 class="heading">Quiz</h1>
        <div class="wrapper">
            <label>Title Quiz : {{ quiz?.quiz_title }}</label>
            <!-- <input v-model="messageTitle" type="text" class="input_title"><br> -->
            <div class="controls">
                <button id="add_question_fields" @click="addQues">Add Question</button>
            </div>
        </div><br>

        <div v-for="(question, indexOfQuestion) in questions" :key="indexOfQuestion">
            <label>Question {{ indexOfQuestion + 1 }}: <input type="text" class="question"
                    v-model="question.title"></label>
            <label>Ans :<input type="text" class="ans" v-model="question.answer"></label>
            <label>Score : <input type="number" min="0" max="100" v-model="question.score" @keydown="handleChange()">
            </label>
            <button @click="remove(indexOfQuestion)">Remove</button>

            <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model="question.type">
                    <option value="text">Text</option>
                    <option value="choice">Choice</option>
                </select>
                <div v-if="question.type && question.type === 'choice'" class="checkbox">
                    <!-- <form>
                        <input type="text" id="choice1" placeholder="choice1" v-model="question.choice1"><br>
                        <input type="text" id="choice2" placeholder="choice2" v-model="question.choice2"><br>
                        <input type="text" id="choice3" placeholder="choice3" v-model="question.choice3"><br>
                    </form> -->
                    <div>
                        <button id="add_choice" @click="addChoice(indexOfQuestion)">Add</button>
                    </div>
                    <form>
                        <div v-for="(choice, index) in question.choices" :key="index">
                            <label>Choice {{ index + 1 }}: </label>
                            <input :id="'choice' + index" type="radio" name="choice" v-model="choice.input"
                                @click="selectedChoice(index, indexOfQuestion)">
                            <input type="text" placeholder="choice" v-model="choice.name">
                            <button @click="removeChoice(indexOfQuestion, index)">Remove</button>

                        </div>
                    </form>


                </div>
            </div>
        </div><br>

        <!-- <div class="setTimeOut">
            <form>
                <label for="qiuzime">Quiz date : </label>
                <input type="datetime-local" id="qiuztime" name="qiuztime" v-model="quizDate">
            </form>
        </div> -->

        <span class="total_question">Total Question :{{ count }}</span><br>
        <span class="total_score">Total Score : {{ totalScore }} </span><br>
        <label>Quiz date : {{ new Date(quiz?.post_at) }}</label><br>
        <label v-if="status">Draft</label>
        <button class="btn" @click="addData">Submit</button>
    </div>
</template>

<script>

import Question from '@/models/Question'
import Quiz from '@/models/Quiz'
import { Choice } from '@/models'
//import Choice from '@/models/Choice'

export default {
    name: 'QuizPageTeacher',
    data() {
        return {
            // questions: [{  //mock1
            //     title: "",
            //     answer: "",
            //     type: "text"
            // },
            // {
            //     title: "",  //mock2
            //     answer: "",
            //     type: "text"
            // }]
            messageTitle: "",
            quizDate: "",
            questions: [{
                title: "",
                answer: "",
                type: "text",
                choices: [{
                    name: '',
                    input: '1'
                }]
            }],
            totalScore: "",
            count: 1,
            status: false,


        }
    }, computed: {
        isRoute() {
            return this.$route
        },
        quizId() {
            return this.$route.params.quizId
        },
        quiz() {
            return Quiz.query().where('id', parseInt(this.quizId)).with('questions').first();
        },
        getQuestions() {
            return this.quiz &&
                this.quiz.questions &&
                this.quiz.questions.length ?
                Question.query().where('quiz_id', this.quiz.id).get() : [];
        },
        dateTime() {
            return this.quizDate;
        },
        getChoice() {
            return Question.query().where('quiz_id', this.quiz.id).with('choices').get()
        }


    },
    methods: {
        addQues: function () {
            // this.count++
            return this.required = "",
                this.count = this.count + 1,
                this.questions.push({
                    title: "",
                    answer: "",
                    type: "text",
                    score: "",
                    choices: []
                }),
                this.status = "Draft",
                console.log(typeof this.status),
                console.log(this.questions)
            // let sum = 0;
            // this.questions.forEach(item => {
            //     sum += Number(item.score)
            // })
            // console.log("result", sum)
        },
        remove: function (index) {
            this.count--;
            this.questions.splice(index, 1)

        },
        addChoice: function (index) {
            console.log('146', this.questions[index]);
            this.questions[index].choices.push({
                input: '',
                name: ''
            })
            console.log('146', this.questions[index].choices[0]);

            // this.choices.push({ ans: "" })
            // console.log('146', typeof index);
            // index = { choice: this.choices }
            // console.log('148', index);.
            // console.log(this.questions[index].choices);
            // this.questions[index]?.choices
            // this.questions[index] = { item: '' }
            //console.log(this.questions[index]); //ให้ค่าobj.
            //this.questions[index]['choices'] = []
            // this.questions[index]['choices']?.push({
            //     item: 'test',
            //     input: '123'
            // })
            // return this.question.choices.push({
            //     item: '',
            //     input: ''
            // })
        },

        removeChoice: function (indexOfQuestion, index) {
            // this.choices.splice(index, 1)
            this.questions[indexOfQuestion].choices.splice(index, 1)
            // const arr = [{ ans: '', title: '', choice: [{ input: '', name: '' },{ input: '', name: '' },{ input: '', name: '' }] }]
            // const input = arr[0].choice.splice(index, 1)
        },
        selectedChoice: function (index, indexOfQuestion) {
            // console.log("180", e.target.id)
            // const index = e.target.id.replace(/choice/i, "")
            console.log("180", index, indexOfQuestion)
            this.questions[indexOfQuestion].choices.map((item, i) => {
                if (i === index) {
                    console.log(this.questions[indexOfQuestion].choices[i].input)
                    this.questions[indexOfQuestion].choices[i] = { input: "test", name: "" }
                    console.log(this.questions[indexOfQuestion].choices[i].input)

                } else {
                    this.questions[indexOfQuestion].choices[i] = { input: "", name: "" }
                    console.log(this.questions[indexOfQuestion].choices[i].input)

                }
            })


        },

        addData: async function () {
            // const dateTimeInput = new Date(this.quizDate);
            // const dateTimeNow = new Date();
            // console.log('now ===', dateTimeNow)
            // console.log('QuizDate ===', dateTimeInput)
            // console.log(typeof this.quizDate)
            console.log('169', this.questions);
            console.log('choice', this.questions[0].choices);
            for (let index = 0; index < this.questions.length; index++) {
                const item = this.questions[index];
                console.log('item', item);
                item.quiz = this.quizId
                //item.question = this.getQuestions[0].id;
                //item.question_choice = item.choices;
                //console.log('choice', item.question_choice);
                //item.post_at = new Date(this.dateTime);
            }
            console.log('175', this.questions);

            // if (this.questions[0].choices) {
            //     await this.questions[0].choices.forEach(item => {
            //         Choice.api().postChoice({
            //             question: item.name
            //         })
            //     });
            // } else if (!this.questions[0].choices) {
            //     //await Question.api().postQuestions(this.questions)
            //     console.log('333333333333');
            // }

            // console.log('175', this.questions.forEach(item => {
            //     console.log(item.choices[0].name);
            // }));
            //console.log('197', this.questions[0].choices);
            const titleQuestion = await Question.api().postQuestions(this.questions)
            // this.questions.forEach(async (item, index) => {
            //     console.log('foreach' + index, item);
            //         question_name: item.title,
            //         question_ans: item.answer,
            //         question_score: item.score,
            //         question_type: item.type,
            //         question_choice1: item.choice1,
            //         question_choice2: item.choice2,
            //         question_choice3: item.choice3,
            //    })
            console.log(titleQuestion);
            //this.$router.push({ name: 'HomeTeacherPage' })

            //this.$router.push({ name: 'HomeStudentPage', params: { quizId: this.quizId } })

            //location.href = '/home-teacher';
            //this.$router.push({ name: 'HomeTeacherPage' })

            // const dateTimeInput = new Date(this.quizDate);
            // const dateTimeNow = new Date();

            // console.log('now ===', dateTimeNow)
            // console.log('QuizDate ===', dateTimeInput)
            // console.log(typeof this.quizDate)

            // if (dateTimeInput > dateTimeNow) {
            //     //return this.status = "false",
            //     console.log("title quiz =>", this.quiz.quiz_title, "time to quiz =>", this.quizDate,
            //         "จำนวนข้อ", this.count, "status", this.status)

            // } else {
            //     ""
            // }
        },
        handleChange: function () {
            let sum = 0;
            this.questions.forEach(item => {
                sum += Number(item.score)
            })
            console.log("result", sum)
            this.totalScore = sum

        },
        post() {
            console.log(this.getQuestions[0].question_score);
            this.questions.splice(this.questions, 1)
            this.count = 0
            this.getQuestions.forEach(item => {
                this.count++,
                    this.questions.push({
                        answer: item.question_ans,
                        title: item.question_name,
                        score: item.question_score,
                        type: item.question_type,
                        choice1: item.question_choice1,
                        choice2: item.question_choice2,
                        choice3: item.question_choice3,
                    })
            })
            this.handleChange()
            // this.questions.push({
            //     answer: this.getQuestions[0].question_ans,
            //     title: this.getQuestions[0].question_name,
            //     score: this.getQuestions[0].question_score,
            //     type: this.getQuestions[0].question_type,
            //     choice1: this.getQuestions[0].question_choice1,
            //     choice2: this.getQuestions[0].question_choice2,
            //     choice3: this.getQuestions[0].question_choice3,
            // })
        }
    },
    async mounted() {
        await Quiz.api().getQuizById(this.quizId)
        // console.log(await Quiz.api().getQuizById(this.quizId));
        await Choice.api().getChoice()
        // const question = await Question.api().getQuestionById(this.quizId)
        // console.log(this.quiz.questions_id);
        console.log('mouted', this.getQuestions);
        if (this.getQuestions !== null) {
            this.post()
        }
        //Choice.api().getChoice()
    }
}

</script>

<style scoped>
.heading {
    text-transform: capitalize;
    text-align: center;
    font-size: 80px;
    font-weight: 300;
    color: aliceblue;
    font-family: 'Times New Roman', Times, serif;
}

.input_title {
    height: 35px;
    width: 400px;
    border-radius: 5px;
    border: none;
    padding: 15px;
}
</style>