<template>
    <div id="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="账号" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="name">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 100%;
        height: 100%;
        border-top: 1px solid #ddd;
        box-sizing: border-box;
    }

    #login /deep/ .demo-ruleForm {

        width: 400px;
        min-height: 400px;
        margin: 30px auto;
        border: 1px solid #ddd;
        padding: 20px;
    }

</style>