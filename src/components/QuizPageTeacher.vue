<template>
    <div id="quiz">
        <h1 class="heading">Quiz</h1>
        <div class="wrapper">
            <label>Title Quiz : </label>
            <input v-model="messageTitle" type="text" class="input-title"><br>
            <div class="controls">
                <button id="add_question_fields" @click="addQues">Add Question</button>
            </div>
        </div>
        <div v-for="(question, index) in questions" :key="index">
            <label>Question {{index+1}}: <input type="text" class="question" v-model="question.title"></label>
            <label>Ans :<input type="text" class="ans" v-model="question.answer"></label>
            <label>Score : <input type="number" min="0" max="100" v-model="question.score" @keydown="handleChange()">
            </label>
            <button @click="remove(index)">Remove</button>

            <div class="form-group">
                <label>Type</label>
                <select class="form-control" v-model="question.type">
                    <option value="text">Text</option>
                    <option value="choice">Choice</option>
                </select>
                <div v-if="question.type && question.type ==='choice'" class="checkbox">
                    <form>
                        <input type="text" id="choice1" placeholder="choice1" v-model="question.choice1"><br>
                        <input type="text" id="choice2" placeholder="choice2" v-model="question.choice2"><br>
                        <input type="text" id="choice3" placeholder="choice3" v-model="question.choice3"><br>
                    </form>
                </div>
            </div>

        </div>

        <div class="setTimeOut">
            <!-- <label>Time : </label> -->
            <!-- <input type="text" placeholder="Hr" v-model="messageHr">
            <input type="text" placeholder="Min" v-model="messageMin">
            <input type="text" placeholder="Sec" v-model="messageSec"> -->
            <form>
                <label for="qiuzime">Quiz date : </label>
                <input type="datetime-local" id="qiuztime" name="qiuztime" v-model="quizDate">
                <!-- <input type="submit"> -->
            </form>
        </div>

        <span>Total Score : {{totalScore}} </span>
        <!-- <button class="btn" @click="addTitle">Submit</button> -->
        <button class="btn" @click="addData">Submit</button>

    </div>
</template>

<script>

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
            questions: [],
            totalScore: "",
            // messageHr: "",
            // messageMin: "",
            // messageSec: "",
        }
    }, methods: {
        addQues: function () {
            // this.count++;
            this.questions.push({
                title: "",
                answer: "",
                type: "text",
                score: "",
            })
            // let sum = 0;
            // this.questions.forEach(item => {
            //     sum += Number(item.score)
            // })
            // console.log("result", sum)
        },
        remove: function (index) {
            // this.count--;
            this.questions.splice(index, 1)

        },
        // addTitle: function () {
        //     sessionStorage.messageTitle = this.messageTitle;
        //     // const test = 1234
        //     // sessionStorage.messageTime = test
        //     const Hr = Number(this.messageHr) * 3600
        //     const Min = Number(this.messageMin) * 60
        //     sessionStorage.messageTime = (Hr + Min + Number(this.messageSec)) * 1000;

        //     // console.log(this.messageTitle)
        //     location.href = '/home-student';
        // },
        addData: function () {
            const dateTimeInput = new Date(this.quizDate);
            const dateTimeNow = new Date();
            // console.log('now ===', dateTimeNow)
            // console.log('QuizDate ===', dateTimeInput)
            // console.log(typeof this.quizDate)

            if (dateTimeInput > dateTimeNow) {
                console.log("title quiz =>", this.messageTitle, "time to quiz =>", this.quizDate)
            } else {
                ""
            }
        },
        handleChange: function () {
            let sum = 0;
            this.questions.forEach(item => {
                sum += Number(item.score)
            })
            console.log("result", sum)
            this.totalScore = sum

        }

    },
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

.input-title {
    height: 35px;
    width: 400px;
    border-radius: 5px;
    border: none;
    padding: 15px;
}
</style>