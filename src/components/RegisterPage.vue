<template>
    <div id="register">
        <h1 class="heading">Register</h1>
        <div class="register-form">
            <select class="roleUser" v-model="role">
                <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.role_name }} </option>
            </select><br>
            <input class="input_name" type="text" placeholder="name" v-model="username"><br>
            <input class="input_email" type="text" placeholder="email" v-model="email"><br>
            <input class="input_password" type="text" placeholder="password" v-model="password"><br>
            <button @click="onClickRegisterPage()" class="btn"> Register </button><br>
            <router-link to="/login" class="link">Already Have An Account? Log In Here</router-link>
        </div>
    </div>
</template>

<script>
import Role from '@/models/Role';
import User from "../models/User"
// import axios from "axios"
export default {
    name: "RegisterPage",
    data() {
        return {
            username: "",
            email: "",
            password: "",
            role: ""
        }
    },
    computed: {
        roles() {
            return Role.query().with('users').get();
        }
    },
    methods: {
        async onClickRegisterPage() {
            await User.api().register({
                username: this.username,
                password: this.password,
                email: this.email,
                user_role: this.role
            });
            location.href = '/login';
            // fetch('http://localhost:3000/user-all', { method: "GET" })
            //     .then(response => response.json())
            //     .then(data => console.log('datauser', data))
            // const result = await axios.post("http://localhost:1337/users", {
            //     input_name: this.username,
            //     input_email: this.email,
            //     input_password: this.password,
            //     roleUser: this.role
            // })
            // console.log("result", result)
        },
    },
    // window: onload = async () => {
    //     const userRole = await Role.api().getRoles();
    //     console.log(userRole.entities.userRoles)
    //     fetch('http://localhost:1337/user-roles', { method: "GET" })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('role', data)
    //             let output = "";
    //             data.forEach(role => {
    //                 output += `<option value="${role.id}">${role.role_name}</option>`;
    //                 console.log(role.role_name);

    //             })
    //             let role = document.querySelector('.roleUser');
    //             role.innerHTML = output;
    //         })
    // },

    async mounted() {
        await Role.api().getRoles();
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    width: 100%;
    min-height: 50vh;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(209, 208, 211);
    font-family: 'Times New Roman', Times, serif;
}

#register {
    width: 400px;
    height: auto;
    color: aliceblue;
    font-family: 'Times New Roman', Times, serif;
}

.heading {
    text-transform: capitalize;
    text-align: center;
    font-size: 80px;
    font-weight: 300;
    margin-bottom: 40px;
}

.input-old,
.btn {
    width: 80%;
    height: 35px;
    display: block;
    margin: 1px auto;
    border-radius: 5px;
    border: none;
    color: rgb(82, 53, 94);
    padding: 15px;

}

input::placeholder {
    color: rgb(158, 155, 152);
}

input:focus,
.btn:hover {
    background: #fff;
    color: black;
}

input:focus::placeholder {
    color: #000;
}

.btn {
    width: auto;
    padding: 0 20px;
    cursor: pointer;
    margin: 30px auto 0;
    text-transform: capitalize;
}

.link {
    text-align: center;
    text-transform: capitalize;
    text-decoration: rgb(71, 71, 71);
    display: block;
    margin: 30px auto;
}

.link:hover {
    color: #fff;
}
</style>