<template>
    <div class="col-md-6">
        <!-- general form elements -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">thêm danh mục mới</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
            <form role="form" @click.prevent="addCategory()">
                <div class="card-body">
                    <div class="form-group">
                        <label for="categoryId">thêm danh mục mới</label>
                        <input type="text" class="form-control" id="categoryId" placeholder="thêm danh mục mới" name="cat_name" v-model="form.cat_name" :class="{ 'is-invalid': form.errors.has('cat_name') }">
                        <has-error :form="form" field="cat_name"></has-error>
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
        name: "new",
        data(){
            return {
                form : new Form({
                    cat_name : ''
                })
            }
        },
        methods : {
            addCategory(){
                this.form.post('/add-category')
                    .then((response)=>{
                        this.$router.push('/Category_list')

                        Toast.fire({
                            type: 'success',
                            title: 'thêm thành công thể loại'
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