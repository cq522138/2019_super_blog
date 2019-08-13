<template>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">danh sách bài viết</h3>
                        <div class="card-tools">
                            <button class="btn btn-primary">
                                <router-link to="/add-post" style="color: #fff">thêm bài viết</router-link>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>S1</th>
                                <th>người dùng</th>
                                <th>thể loại</th>
                                <th>tiêu đề</th>
                                <th>miêu tả</th>
                                <th>ảnh</th>
                                <th>hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(post,index) in allpost">
                                <td>{{index +1}}</td>
                                <td v-if="post.user">{{post.user.name}}</td>
                                <td v-if="post.category">{{post.category.cat_name}}</td>
                                <td>{{post.title}}</td>
                                <td>{{post.description | sortlength(40,"....")}}</td>
                                <td><img :src="ourImage(post.photo)" alt="" width="40" height="50"></td>
                                <td>
                                    <router-link :to="`edit-post/${post.id}`">sửa</router-link>
                                    <a href="" @click.prevent="deletePost(post.id)">xóa</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>

            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
    <!-- /.content -->
</template>

<script>
    export default {
        name: "List",
        mounted(){
            this.$store.dispatch('getAllPost')
        },
        computed:{
            allpost(){
                return this.$store.getters.getAllPost
            }
        },
        methods:{
            ourImage(img){
                return "uploadimage/"+img;
            },
            deletePost(id){
                axios.get('/delete/'+id)
                    .then(()=>{
                        this.$store.dispatch('getAllPost')
                        Toast.fire({
                            type: 'success',
                            title: 'xóa thành công bài đăng'
                        })
                    })
                    .catch(()=>{})
            }
        }
    }
</script>

<style scoped>

</style>