import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue"
import HomeTeacherPage from "./components/HomeTeacherPage.vue"
import QuizPageTeacher from "./components/QuizPageTeacher.vue"
import QuizPageStudent from "./components/QuizPageStudent.vue"
import HomeStudentPage from "./components/HomeStudentPage.vue"
import QuizPage from "./components/QuizPage.vue"
import VueRouter  from 'vue-router';
import Vue from "vue";

Vue.use(VueRouter)

const routes = [
    {
        name: "SignUp",
        component: SignUp,
        path: "/",
    },
    {
        name: "LoginPage",
        component: LoginPage,
        path: "/login",
    },
    {
        name: "RegisterPage",
        component: RegisterPage,
        path: "/register",
    },
    {
        name: "HomeTeacherPage",
        component: HomeTeacherPage,
        path: "/home-teacher",
    },
    {
        name: "QuizPageTeacher",
        component: QuizPageTeacher,
        path: "/quiz-teacher",
    },
    {
        name: "QuizPageStudent",
        component: QuizPageStudent,
        path: "/quiz-student/:quizId",
    },
    {
        name: "HomeStudentPage",
        component: HomeStudentPage,
        path: "/home-student",
    },
    {
        name: "QuizPage",
        component: QuizPage,
        path: "/quiz",
    },
    
    
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes,
});

export default router;