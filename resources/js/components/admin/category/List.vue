<template>
    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Danh sách chuyên mục</h3>
                        <div class="card-tools">
                            <button class="btn btn-primary">
                                <router-link to="/add-category" style="color: #fff">thêm thể loại</router-link>
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>S1</th>
                                <th>tên danh mục</th>
                                <th>thời gian</th>
                                <th>hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(category,index) in getallCategory" :key="category.id">
                                <td>{{index+1}}</td>
                                <td>{{category.cat_name}}</td>
                                <td>{{category.created_at | timeformat}}</td>
                                <td>
                                    <router-link :to="`/edit-category/${category.id}`">sửa</router-link>
                                    <a href="" @click.prevent="deletecategory(category.id)">xóa</a>
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
        name: "list",
        mounted(){
            this.$store.dispatch("allCategory")
        },
        computed:{
          getallCategory(){
              return this.$store.getters.getCategory
          }
        },
        methods:{
            deletecategory(id){
                axios.get('/category/'+id)
                    .then(()=>{
                        this.$store.dispatch("allCategory")
                        Toast.fire({
                            type: 'success',
                            title: 'xóa danh mục thành công'
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