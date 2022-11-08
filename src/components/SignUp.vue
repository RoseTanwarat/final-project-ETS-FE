<template>
    <div>
        <!-- <div id="signUp" v-if="userActive">
            <h1>loading...</h1>
        </div> -->
        <div id="signUp">
            <img alt="Vue logo" src="../assets/logo.png"><br>
            <button class="btn">
                <router-link to="/login" class="signUp">Welcome</router-link>
            </button>
        </div>
    </div>

</template>

<script>
import User from '@/models/User'
export default {
    name: "SignUp",
    data() {
        return {
            userActive: false
        }
    },
    computed: {
        user() {
            // console.log('user first', User.query().with('user_role').first());
            return User.query().with('user_role').first();
        },

    },

    methods: {
        getOut() {
            const role = this.user?.user_role.role_name
            if (role === "teacher") {
                this.$router.push({ name: 'HomeTeacherPage' })
                //console.log("teacher");
            } else if (role === "student") {
                //console.log("student");
                this.$router.push({ name: 'HomeStudentPage' })
            }

        }
    },
    async mounted() {
        //this.userActive = true
        const user = document.cookie.split(" ")[0].split('=')[1].split(';')
        console.log("this.userActive", user);

        await User.api().getUsers({ email: user[0] })
        //console.log(await User.api().getUsers({ email: user[0] }));
        if (user[0] !== null && user[0] !== undefined && user[0] !== "") {
            this.getOut()
        }
        //else {
        //     this.userActive = false

        // }

    }
}

</script>

<style>
.signUp {
    text-decoration: rgb(71, 71, 71);
}
</style>

