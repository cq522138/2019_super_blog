<template>
    <div class="col-md-6">
        <!-- general form elements -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">chỉnh sửa danh mục</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form role="form" @submit.prevent="updateCategory()">
                <div class="card-body">
                    <div class="form-group">
                        <label for="categoryId">chỉnh sửa danh mục</label>
                        <input type="text" class="form-control" id="categoryId" placeholder="t" name="cat_name" v-model="form.cat_name" :class="{ 'is-invalid': form.errors.has('cat_name') }">
                        <has-error :form="form" field="cat_name"></has-error>
                    </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                    <button type="submit" class="btn btn-primary">cập nhật</button>
                </div>
            </form>
        </div>
        <!-- /.card -->
    </div>
</template>

<script>
    export default {
        name: "Edit",
        mounted(){
            axios.get(`/editcategory/${this.$route.params.categoryid}`)
                .then((response)=>{
                    this.form.fill(response.data.category)
                })
        },
        data(){
            return {
                form : new Form({
                    cat_name : ''
                })
            }
        },
        methods : {
            updateCategory(){
                this.form.post(`/update-category/${this.$route.params.categoryid}`)
                    .then((response)=>{
                        this.$router.push('/Category_list')

                        Toast.fire({
                            type: 'success',
                            title: 'cập nhật thành công thể loại'
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