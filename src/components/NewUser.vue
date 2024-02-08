<template>
    <div class="container flex-1 flexflex-col items-center max-w-lg mx-auto px-4 py-28">
        <form @submit.prevent="addUser" class="flex flex-col p-6 rounded-2xl shadow-xl">
            <h1 class="text-center text-5xl mb-6 text-black">Sign Up</h1>

            <input v-model="user.fname" id="fname" type="text"
                class="w-auto mb-8 mt-6 mx-8 rounded-lg focus: text-black placeholder-black-200 border-black-200 border-t-transparent bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="First Name" />

            <input v-model="user.lname" id="lname" type="text"
                class="w-auto mb-8 mt-6 mx-8 rounded-lg focus: text-black placeholder-black-200 border-black-200 border-t-transparent bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="Last Name" />

            <input v-model="user.email" id="newemail" type="email"
                class="w-auto  mb-8 mt-6 mx-8 rounded-lg shadow-none 
                text-black placeholder-black-200 border-black-200 border-t-transparent 
                bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black" placeholder="Email" />
            <input v-model="user.phone" id="phone" type="tel"
                class="w-auto mb-8 mt-6 mx-8 rounded-lg focus: text-black placeholder-black-200 border-black-200 border-t-transparent bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="Phone Number" />

            <input v-model="user.dob" id="dob" type="date"
                class="w-auto mb-8 mt-6 mx-8 rounded-lg focus: text-black placeholder-black-200 border-black-200 border-t-transparent bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="DOB" />


            <input v-model="user.pswd" id="password" type="password"
                class="text-black  w-auto mb-8 mt-6 mx-8 rounded-lg bg-transparent border-black-200 border-t-transparent placeholder-black-200 focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="Password" />

            <input v-model="user.pswd2" id="password_confirm" type="password"
                class="w-auto  mb-8 mt-6 mx-8 rounded-lg text-black
                placeholder-black-200 border-black-200 border-t-transparent bg-transparent focus:outline-none focus:ring-transparent focus:border-black-200 focus:placeholder-transparent focus:text-black"
                placeholder="Confirm Password" />

            <button @click="addUser"
                class="relative inline-flex items-center justify-center p-0.5
                 mb-8 mt-6 mx-8 overflow-hidden text-sm font-medium text-black
                  rounded-lg group bg-gradient-to-br from-red-600 to-pink-500 group-hover:from-red-600 group-hover:to-pink-500 hover:text-white dark:text-white focus:outline-none dark:focus:ring-pink-800">
                <span
                    class="relative text-lg w-full px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-black-900 rounded-md group-hover:bg-opacity-0">
                    Create Account
                </span>
            </button>
            <!--  -->
            <div class="inline-flex items-center justify-center w-full">
                <hr class="w-64 h-px my-8 bg-neutral-200 border-0 white" />
                <span class="absolute px-3 font-medium text-white -translate-x-1/2 left-1/2 bg-black">or</span>
            </div>
            <!--  -->

            <button type="button"
                class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 8 19">
                    <path fill-rule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clip-rule="evenodd" />
                </svg>
                Sign up with Facebook
            </button>
            <button type="button"
                class="text-white bg-black hover:bg-black-200 focus:ring-4 focus:outline-none 
                focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">

                <path fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                    clip-rule="evenodd" />
                Sign up with 𝕏
            </button>
            <button type="button"
                class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-black-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clip-rule="evenodd" />
                </svg>
                Sign up with Github
            </button>
            <button type="button"
                class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                    viewBox="0 0 18 19">
                    <path fill-rule="evenodd"
                        d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                        clip-rule="evenodd" />
                </svg>
                Sign up with Google
            </button>
            <button type="button"
                class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                <svg class="w-5 h-5 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor"
                        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z">
                    </path>
                </svg>
                Sign up with Apple
            </button>

            <!--  -->
            <div class="text-center text-sm text-black mt-4">
                By signing up, you agree to the
                <a class="no-underline border-b border-grey-dark text-black" href="#">
                    Terms of Service
                </a>
                and
                <a class="no-underline border-b border-grey-dark text-black" href="#">
                    Privacy Policy
                </a>
            </div>
            <!--  -->
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'NewUser',
    data() {
        return {
            user: {
                fname: '',
                lname: '',
                email: '',
                phone: '',
                dob: '',
                pswd: '',
                pswd2: '',

            },
            emailExists: false,
        }
    },
    methods: {
        checkEmailExists() {
            axios.post("http://localhost:3000/api/check-email", { email: this.user.email })
                .then(response => {
                    this.emailExists = response.data.exists;
                })
                .catch(error => {
                    console.error("Error checking email", error);
                });
        },
        async addUser() {
            // Check if passwords match
            if (this.user.pswd !== this.user.pswd2) {
                console.error("Passwords do not match");
                return;
            }

            const phoneRegex = /^07\d{8}$/;
            if (!phoneRegex.test(this.user.phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            // Calculate age from date of birth
            const dobDate = new Date(this.user.dob);
            const today = new Date();
            let age = today.getFullYear() - dobDate.getFullYear();
            const dobMonth = dobDate.getMonth();
            const todayMonth = today.getMonth();
            if (todayMonth < dobMonth || (todayMonth === dobMonth && today.getDate() < dobDate.getDate())) {
                age--;
            }

            // Check if age is 18 or over
            if (age < 18) {
                // If age is less than 18, show alert and do not proceed with update
                alert('Age must be 18 and over.');
                return;
            }

            try {
                // Check if email already exists
                await this.checkEmailExists();

                // Proceed with adding user only if email doesn't exist
                if (!this.emailExists) {
                    const response = await axios.post("http://localhost:3000/api/user", this.user);
                    console.log("Account Created Successfully", response.data);
                    this.$router.push('/login');
                    // Reset the form data after successful submission
                    this.user = {
                        fname: '',
                        lname: '',
                        email: '',
                        phone: '',
                        dob: '',
                        pswd: '',
                        pswd2: '',
                    };
                } else {
                    console.error("Email already in use");
                    alert('Email already in use.');
                }
            } catch (error) {
                console.error("Error adding user", error);
            }
        }
    }
}
</script>

<style scoped>
input {
    border: 1px solid black;
}
</style>