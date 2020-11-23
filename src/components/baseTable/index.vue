<template>
    <div class="baseTable" v-loading="loading">
        <el-table
            ref="table"
            :data="table.tbody || tableData" 
            v-bind="$attrs" 
            @sort-change="handleSortChange" 
            @select="handleSelectChange" 
            @select-all="handleSelectAll">
            <template v-for="(th, thIndex) in table.thead" >
                <!-- 排序[index] -->
                <el-table-column 
                    v-if="th.type === 'index'" 
                    type="index" 
                    :key="th.key || thIndex" 
                    width="80" 
                    align="center"
                    v-bind="{...th}" ></el-table-column>
                <!-- 勾选[selection] -->
                <el-table-column 
                    v-else-if="th.type === 'selection'" 
                    type="selection" 
                    :key="th.key || thIndex" 
                    width="60"
                    align="center"
                    v-bind="{...th}" ></el-table-column>
                <!-- 操作[x] -->
                <el-table-column 
                    v-else-if="th.type === 'x'" 
                    :key="th.key || thIndex" 
                    fixed="right"
                    width="200"
                    v-bind="{...th}" >
                    <template slot-scope="scope">
                        <div v-if="th.render">{{ th.render ? th.render(scope, th) : ''}}</div>
                        <div v-else-if="th.buttons && th.buttons.length">
                            <template v-for="(btn, btnIndex) in th.buttons">
                                <el-tooltip 
                                    :key="btnIndex"
                                    v-if="(btn.props && btn.props.icon)"
                                    effect="dark" 
                                    :content="btn.name" 
                                    placement="top">
                                    <el-button 
                                        :type="(btn.props && btn.props.type) || 'primary'"
                                        :size="(btn.size && btn.props.size) || 'mini'"
                                        circle
                                        v-bind="btn.props"
                                        @click="btn.click && btn.click(scope, th)"></el-button>
                                </el-tooltip>
                                <el-button 
                                    v-else
                                    :key="btnIndex"
                                    :type="(btn.props && btn.props.type) || 'primary'"
                                    :size="(btn.size && btn.props.size) || 'mini'"
                                    v-bind="btn.props"
                                    @click="btn.click && btn.click(scope, th)">
                                    <span>{{btn.name}}</span>
                                </el-button>
                            </template>
                        </div>
                    </template>
                </el-table-column>
                <!-- solt插槽[scope] -->
                <el-table-column 
                    v-else-if="th.type === 'scope'" 
                    :key="th.key || thIndex" 
                    v-bind="{...th}" >
                    <template v-slot="scope">
                        <slot :name="th.scopeName" v-bind="scope"></slot>
                    </template>
                </el-table-column>
                <!-- 其他 -->
                <el-table-column
                    v-else 
                    :key="th.key || thIndex" 
                    v-bind="{...th}" >
                    <template slot-scope="scope">
                        <div v-if="th.renderHtml" 
                            :class="{
                                'is_flowhidden': th.flowhidden
                            }" 
                            :style="th.style" 
                            v-html="th.renderHtml(scope, th)"
                            @click="th.click && th.click(scope, th)"></div>
                        <div v-else 
                            :class="{
                                'is_flowhidden': th.flowhidden
                            }"
                            :style="th.style"
                            @click="th.click && th.click(scope, th)">
                            {{ th.render ? th.render(scope, th) : scope.row[th.prop]}}
                        </div>
                    </template>
                </el-table-column>
            </template>
        </el-table>

        <div class="pagination" v-if="hasPagination">
            <el-pagination
                background 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="page.currentPage" 
                :page-sizes="page.pageSizes" 
                :page-size="page.pageSize" 
                :layout="page.layout" 
                :total="page.total" >
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import request from '@/utils/request';
// import Util from '@/utils/util';

export default {
    name: 'BaseTable',
    props: {
        //是否加载完立即获取数据
        ready: {
            type: Boolean,
            default: true
        },
        //request信息
        request: Object,
        //table配置
        table: {
            type: Object,
            default: function() {
                return {
                    thead: []
                }
            }
        },
        //是否显示分页
        hasPagination: {
            type: Boolean,
            default: true
        },
        //分页配置
        pagination: Object,
        //选中的key
        selectionKey: {
            type: String,
            default: function() {
                return 'id'
            }
        },
        //为空时是否查询全部数据
        all: Boolean,
    },
    data() {
        return {
            loading: false,
            params: {},
            page: {
                currentPage: 1,
                pageSizes: [10, 30, 50, 100, 200],
                pageSize: 10,
                layout: "total, sizes, prev, pager, next, jumper",
                total: 0,
            },
            tableData: [],
            //存储选中
            selection: [],
        }
    },
    created() {
        if(this.pagination) {
            this.page = {...this.page, ...this.pagination}
        }
    },
    mounted() {
        if(this.ready) {
            this.init()
        }
    },
    watch: {
        'page.currentPage': function(size) {
            this.resetSelection(size)
        }
    },
    methods: {
        //初始化
        init() {
            this.getTableData()
        },
        //刷新
        refresh() {
            this.getTableData()
        },
        //重置
        reset() {
            this.selection = [];
            this.page.currentPage = 1;
            this.refresh()
        },
        //排序
        handleSortChange(column, prop, order ) {
            this.params.sort = column.order ? column.prop : null;
            this.params.order = column.order ? column.order === "ascending" ? "asc" : "desc" : null;
            
            this.refresh()
        },
        //全选中事件
        handleSelectAll(selection) {
            this.selection[this.page.currentPage] = selection;
        },
        //行选中事件
        handleSelectChange(selection, row) {
            this.selection[this.page.currentPage] = selection;
            
        },
        //遍历选中数据
        mapSelection() {
            let list = [];
            this.selection.forEach(v => {
                if(v && v.length) {
                    list = [...list, ...v]
                }
            })
            return list;
        },
        //遍历选中数据keys
        mapSelectionKeys() {
            let list = [];
            this.selection.forEach(v => {
                if(v && v.length) {
                    list = [...list, ...v.map(v => v[this.selectionKey])]
                }
            })
            return list;
        },

        //获取数据
        getTableData() {
            // if(!this.request || !this.request.url) return;

            // this.loading = true;
            // const params = {...this.params, ...this.request.params};
            //     params.page = this.page.currentPage;
            //     params.pageSize = this.page.pageSize;
            //     if(typeof this.all === 'boolean') params.all = this.all;
            // request({
            //     url: this.request.url,
            //     method: 'get',
            //     params: params
            // }).then(res => {
            //     if(res.code == 200) {
            //         this.page.total = res.data.total || 0;
            //         if(res.data && res.data.list) {
            //             this.tableData = res.data.list || [];
            //             this.resetSelection(this.page.currentPage)
            //         }
            //     } else {
            //         Util.msg(res.msg || '查询失败', {type: 'error'})
            //     }
            //     this.loading = false;
            // })
        },

        //分页-size
        handleSizeChange(size) {
            this.page.currentPage = 1;
            this.page.pageSize = size;
            this.selection = [];
            this.refresh();
            this.$emit('pageSizeChange', size)
        },
        //分页-currentPage
        handleCurrentChange(size) {
            this.page.currentPage = size;
            this.refresh();
            this.$emit('pageCurrentChange', size)
        },
        //初始化选中状态
        resetSelection(size) {
            let selectList = (this.selection[size] || []).map(v => v[this.selectionKey]);
            if(selectList && selectList.length) {
                this.tableData.forEach((v, index) => {
                    if(selectList.indexOf(v[this.selectionKey]) != -1) {
                        this.$nextTick(() => {
                            this.$refs.table.toggleRowSelection(this.tableData[index], true)
                        })
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="scss">
.baseTable{
    .is_flowhidden{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .pagination{
        box-sizing: border-box;
        padding: 12px;
        text-align: right;
    }
}
</style>