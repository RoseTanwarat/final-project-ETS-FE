<template>
    <div id="login">
        <h1 class="heading">Login</h1>
        <input v-model="message1" class="input-old" type="text" placeholder="email"><br>
        <input v-model="message2" class="input-old" type="text" placeholder="password"><br>
        <button @click="onClickLoginPage()" class="btn"> Login </button><br>
        <router-link to="/register" class="link">Don't Have An Account? Register One</router-link>

    </div>
</template>

<script>
//import axios from 'axios'
import User from "../models/User"
export default {
    name: 'LoginPage',
    data() {
        return {
            message1: "",
            message2: ""
        }
    },
    computed: {
        userData() {
            return User.query().where('email', this.getCurrentUser).get()
        },
        cookie() {
            return document.cookie
        }
    },
    methods: {
        async onClickLoginPage() {
            if (!this.message1.length || !this.message2.length) {
                return alert('fill all the fields')
            } else {
                const result = await User.api().getUsers({ email: this.message1 });
                //sessionStorage.email = result;
                const emailUser = result.entities.users[0].email
                const idUser = result.entities.users[0].id
                // sessionStorage.email = emailUser
                document.cookie = `email=${emailUser}`;
                document.cookie = `id=${idUser}`;
                //console.log(sessionStorage.email)
                //console.log(result.entities.users[0].email)
                if (result && result.entities && result.entities.userRoles) {
                    const roleUserLoginNow = result.entities.userRoles[0].role_name
                    //console.log(roleUserLoginNow);
                    if (roleUserLoginNow === "teacher") {
                        this.$router.push({ name: 'HomeTeacherPage' })
                    } else if (roleUserLoginNow === "student") {
                        this.$router.push({ name: 'HomeStudentPage' })
                    }
                } else {
                    alert("Cannot log in, username or password is invalid.")
                }
            }

        },
        getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

        async getCurrentUser() {
            const email = this.getCookie("email");
            await User.api().getUsers({ email: email })
        }
    },

    created() {
        this.getCurrentUser()
    }




    //เดิมตัวอย่างเก่าที่โรสทำ
    // const result = await User.api().getUsers();
    // // console.log(result)
    // // console.log(result.entities.users)
    // const correctData = result.entities.users.filter((item) => item.email === this.message1)
    // // console.log(correctData[0])
    // //console.log(correctData[0].user_role_id)
    // // console.log(correctData.length)
    // if (correctData.length > 0) {
    //     sessionStorage.email = correctData[0].email;
    //     //console.log(sessionStorage.email)
    //     if (correctData[0].user_role_id === 2) {
    //         //correctData[0].user_role.role_name === "teacher"
    //         location.href = '/home-teacher';
    //         //console.log("teacher")
    //         //console.log(correctData[0].user_role.role_name)
    //     } else {
    //         location.href = '/home-student';
    //     }
    //     //return console.log("pass")

    // } else {
    //     return alert("Cannot log in, username or password is invalid.")
    // }

}


</script>

<style>
#login {
    width: 400px;
    height: auto;
    color: aliceblue;
    font-family: 'Times New Roman', Times, serif;
}
</style>