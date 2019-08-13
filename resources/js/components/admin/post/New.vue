<template>
<div class="col-md-12">
    <!-- general form elements -->
    <div class="card card-primary">
        <div class="card-header">
            <h3 class="card-title">thêm bài đăng mới</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form role="form" enctype="multipart/form-data" @submit.prevent="addnewPost()">
            <div class="card-body">
                <div class="form-group">
                    <label for="postId">thêm bài đăng mới</label>
                    <input type="text" class="form-control" id="postId" placeholder="thêm danh mục mới" name="title" v-model="form.title" :class="{ 'is-invalid': form.errors.has('title') }">
                    <has-error :form="form" field="title"></has-error>
                </div>

                <div class="form-group">
                    <label for="descriptionId">thêm mô tả</label>
                    <markdown-editor v-model="form.description"></markdown-editor>
                    <has-error :form="form" field="description"></has-error>
                </div>

                <div class="form-group">
                    <label for="postId">chọn danh mục</label>
                    <select class="form-control" :class="{ 'is-invalid': form.errors.has('cat_id') }" v-model="form.cat_id">
                        <option disabled value="">chọn một danh mục</option>
                        <option :value="category.id" v-for="category in getallCategory">{{category.cat_name}}</option>
                    </select>
                    <has-error :form="form" field="cat_id"></has-error>
                </div>

                <div class="form-group">
                    <input @change="changePhoto($event)" name="photo" type="file" :class="{ 'is-invalid': form.errors.has('photo') }">
                    <img :src="form.photo" alt="" width="80" height="80">
                    <has-error :form="form" field="photo"></has-error>
                </div>
            </div>
            <!-- /.card-body -->

            <div class="card-footer">
                <button type="submit" class="btn btn-primary">lưu lại</button>
            </div>
        </form>
    </div>
    <!-- /.card -->
</div>
</template>

<script>
    export default {
        name: "New",
        data(){
            return {
                form: new Form({
                    title:'',
                    description:'',
                    cat_id:'',
                    photo:'',
                })
            }
        },
        mounted(){
            this.$store.dispatch("allCategory")
        },
        computed:{
            getallCategory(){
                return this.$store.getters.getCategory
            }
        },
        methods:{
            changePhoto(event){
                let file = event.target.files[0];
                if(file.size>1048576){
                    swal.fire({
                        type: 'error',
                        title: 'Rất tiếc...',
                        text: 'có vẻ file này quá lớn',
                        footer: '<a href>Why do I have this issue?</a>'
                    })
                }else{
                    let reader = new FileReader();
                    reader.onload = event => {
                        // The file's text will be printed here
                        this.form.photo = event.target.result
                        // console.log(event.target.result)
                    };

                    reader.readAsDataURL(file);
                }
            },
            addnewPost(){
                this.form.post('/savepost')
                    .then(()=>{
                        this.$router.push('/Post_list')

                        Toast.fire({
                            type: 'success',
                            title: 'thêm thành công bài đăng mới'
                        })
                    })
                    .catch(()=>{

                    })
            }
        }
    }
</script>

<style scoped>

</style>