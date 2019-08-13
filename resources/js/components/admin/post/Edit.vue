<template>
    <div class="col-md-12">
        <!-- general form elements -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">cập nhật bài đăng {{this.$route.params.postid}}</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form role="form" enctype="multipart/form-data" @submit.prevent="updatePost()">
                <div class="card-body">
                    <div class="form-group">
                        <label for="postId">cập nhật bài đăng</label>
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
                        <img :src="updateImage()" alt="" width="80" height="80">
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
        name: "Edit",
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
        created(){
            axios.get(`post/${this.$route.params.postid}`)
                .then((response)=>{
                    this.form.fill(response.data.post)
                })
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
            updatePost(){
                this.form.post(`update/${this.$route.params.postid}`)
                    .then(()=>{
                        this.$router.push('/Post_list')

                        Toast.fire({
                            type: 'success',
                            title: 'cập nhật thành công bài đăng'
                        })
                    })
                    .catch(()=>{

                    })
            },
            updateImage(){
                let img = this.form.photo;
                if(img.length >100){
                    return this.form.photo
                }else{
                    return `uploadimage/${this.form.photo}`
                }
            }
        }
    }
</script>

<style scoped>

</style>