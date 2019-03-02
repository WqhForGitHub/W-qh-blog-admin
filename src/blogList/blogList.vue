<template>
    <div>
        <a-card class="blogList">
            <div class="title">
                <p>博客列表</p>
            </div>
            <div class="content">
                <div class="blogitem" v-for="(item, index) in $store.state.bloglist" :key="index">
                    <p class="blogtitle">{{item.blogtitle}}</p>
                    <p class="blogbriefcontent">
                       {{item.briefcontent}}
                    </p>
    
                        <div class="operation">
                            <div class="delete" @click="getindex(index)">
                                <p>删除</p>
                            </div>
                            <div class="Edit" @click="Modify(index)">
                                <p>编辑</p>
                            </div>
                           
                            <div class="time">
                                <a-icon class="timeicon" type="clock-circle" />
                                <p>{{item.publishTime}}</p>
                            </div>
                           
                           
                            <div class="eye">
                                <a-icon type="eye" class="eyeicon" />
                                <p>{{item.watchnum}}</p>
                            </div>
                           
                                <div class="quote">
                                    <a-icon type="tags" class="quoteicon" />
                                    
                                </div>
                                <div class="quoteList" v-for="(itemtag, indextag) in item.tagList" :key="indextag">
                                        <!-- <p :style="{color:itemtag.color}">{{itemtag.tagname}}</p> -->
                                        <a-tag class="tag" style="width:100%;height:100%" :color="itemtag.color">{{itemtag.tagname}}</a-tag>
                                </div>
                            
                                <div class="app">
                                    <a-icon type="appstore" class="appstoreicon" />
                                    
                                </div>
                                <div class="appList" v-for="(itemkind,indexkind) in item.selectedkind" :key="indexkind" :style="{backgroundColor:itemkind.backgroundColor}">
                                        <!-- <p :style="{color:itemkind.color}">{{itemkind.name}}</p> -->
                                        <a-tag class="tag" style="width:100%;height:100%" :color="itemkind.color">{{itemkind.name}}</a-tag>
                                </div>
                        </div>
                </div>
                <div class="page"><a-pagination @change="changepage" v-model="current" :total="50" :pageSize="5" /></div>
            </div>
        </a-card>
        <!--删除博客确认框-->
        <a-modal
        title="Delete Blog"
        :visible="DeleteBlog" 
        class="Deletemodal"
        okText="确认删除"
        cancelText="取消"
        @ok="Delete(Deleteindex)"
        @cancel="closeDeleteModal"
        style="margin-top:7%;"
        >
        <p>您要删除此条博客吗?</p>
        </a-modal>
        <!--编辑-->
        <a-modal  title="修改博客" width="80vw" class="modifymodal" v-model="visible" @ok="confirmModify" cancelText="退出" okText="确认修改">
            <div class="content">
                <div class="ModifybasicInfo">
                    <a-input class="title" placeholder="标题" v-model="modifyblogList.blogtitle" />
                    <a-select class="treeSelect" @change="tagchange" mode="multiple" v-model="Modifytag" placeholder="Please select">
                         <a-select-option v-for="(item, index) in $store.state.taglist" :key="index">
                            {{item.tagname}}
                        </a-select-option>
                    </a-select>
                    <a-select @change="classifychange" class="kind" v-model="Modifyclassify">
                        <a-select-option value="font-end">font-end</a-select-option>
                        <a-select-option value="back-end">back-end</a-select-option>
                    </a-select>
                    <a-textarea v-model="modifyblogList.briefcontent" class="brief" placeholder="文章概要" :rows="9"/>
                </div>
                <div class="Edit">
                    <a-textarea v-model="modifyblogList.markdowncontent" class="Markdown" placeholder="Markdown格式的文章内容" :rows="18"/>
                </div>
            </div>
        </a-modal>
        <!--回到顶部按钮-->
        <a-back-top :visibilityHeight="80" />
    </div>
</template>
<script>
import { getbloglist, blog, Deleteblog, modifyblog } from '../api/index'
import { statusCode } from '../api/api.cfg.js'
export default {
    data() {
        return {
            current:1,
            visible: false,
            DeleteBlog:false,
            Deleteindex:0,
            blogList:[],        // 所有博客
            modifyblogList:{},  // 修改博客
            Modifytag:[],
            Modifyclassify:[],
            selectedTag:[],
            selectedkind:[],
            page:1
        }
    },
    methods: {
        // 页数变化
        async changepage(page, pageSize) {
            this.page = page
            const res = await blog({
                methods:'listblog',
                page:page,
                pageSize:pageSize
            })
            console.log(res)
            window.scrollTo(0,0); // 回到顶部
            if (res.status == statusCode.OK) {
                this.ListAllblog();
            }
        },
        classifychange(value) {
            this.modifyblogList.selectedkind = []
            console.log("种类数:")
            console.log(value)
            this.$store.state.classifylist.forEach((item, index) => {
                if(item.name == value) {
                this.modifyblogList.selectedkind.push(item)
                }
            })
            console.log(this.modifyblogList.selectedkind)
        },
        tagchange(value) {    
            this.modifyblogList.tagList = []
            for(let key of value) {
                this.modifyblogList.tagList.push(this.$store.state.taglist[key])
            }
            console.log(this.modifyblogList.tagList)
        },
        closeDeleteModal() {
            this.DeleteBlog = false;
        },
        getindex(index) {
            this.Deleteindex = index
            this.DeleteBlog = true
        },
        // 删除博客
        async Delete(index) {
            // 获取删除项的id值
            let Deleteblogitemid = '';
            this.blogList.forEach((item, indexone) => {
                if(index == indexone) {
                    Deleteblogitemid = item._id
                    console.log(Deleteblogitemid)
                }
            })
            this.DeleteBlog = false
            const res = await Deleteblog({
                methods:'Delete',
                id: Deleteblogitemid
            })
            console.log(res)
            if(res.status == statusCode.OK) {
                this.blogList.splice(index, 1)
                this.initList(this.page)
                this.ListAllblog();
            }
        },
        // 修改博客
        Modify(index) {
            this.ListAllblog();
            this.Modifytag = []
            this.Modifyclassify = []
            this.blogList.forEach((item, indexone) => {
                if(indexone == index) {
                    this.modifyblogList = item
                }
            })
            // 只是为其显示模态框,实际传的是 this.modifyblogList.selectedkind
            this.modifyblogList.selectedkind.forEach((item, index) => {
                this.Modifyclassify.push(item.name)
            })
            this.modifyblogList.tagList.forEach((item, index) => {
                this.Modifytag.push(item.tagname)
            })
            this.visible = true;
        },
        // 所有博客
        async ListAllblog() {
            const res = await getbloglist();
            if (res.status == statusCode.OK) {
                console.log(res)
                this.blogList = res.data;
                this.$store.commit({
                    type:'changebloglist',
                    blogList:this.blogList
                })
            }
        },
        // 确认修改
        async confirmModify() {
            const res = await modifyblog({
                methods:'update',
                id:this.modifyblogList._id,
                blogtitle:this.modifyblogList.blogtitle,  // 博客标题
                tagList:this.modifyblogList.tagList,  // 标签组
                selectedkind:this.modifyblogList.selectedkind, // 类别
                briefcontent:this.modifyblogList.briefcontent, // 简要介绍
                blogcontent:this.modifyblogList.blogcontent    // 博客内容HTML形式
            })
            this.ListAllblog()
            this.initList(this.page)
            this.$message.success('修改成功');
            this.visible = false;
        },
        // 初始化第一页
        async initList(num) {
            const res = await blog({
                methods:'listblog',
                page:num,
                pageSize:5
            })
            console.log(res)
            if(res.status == statusCode.OK) {
                this.ListAllblog();
            }
        },
    },
    mounted() {
        this.initList(1);
    }    
}
</script>

<style lang="less" scoped>
.blogList {
    width:98%;
    min-height:200px;
    height:auto;
    margin-top:0.5%;
    position:relative;
    .title {
        font-size:17px;
        font-weight: bold;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width:100%;
        height:40px;
        border-bottom:1px dashed #E0E0E0;
    }
    .content {
        width:100%;
        min-height:70vh;
        height:auto;
        margin:35px auto;
        .blogitem {
            width:100%;
            height:20%;
            margin-top:2%;
            border-bottom:1px solid #CACACA;
            .blogtitle {
                width:100%;
                height:20%;
                font-size:17px;
                font-weight:bold;
            }
            .blogbriefcontent {
                width:100%;
                height:20%;
                line-height:20px;
                color:gray;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-family: 'Microsoft Yahei';
            }
            .operation {
                width:100%;
                min-height:10px;
                height:auto;
                padding-bottom: 13px;
                display: flex;
                flex-wrap: wrap;
                .delete {
                    width:60px;
                    height:29px;
                    margin-left:20px;
                    text-align: center;
                    line-height:29px;
                    font-size:14px;
                    color:red;
                    border-radius: 5px;
                    border:1px dashed #000;
                }  
                .Edit {
                    width:60px;
                    height:29px;
                    text-align: center;
                    line-height: 29px;
                    font-size:14px;
                    color:blue;
                    border-radius: 5px;
                    margin-left:3%;
                    cursor: pointer;
                    border:1px dashed #000;
                }  
                .time {
                    width:110px;
                    height:30px;
                    display: flex;
                    margin-left:3%;
                    .timeicon {
                        margin-top:10px;
                    }
                    p {
                        margin-left:10px;
                        line-height: 33px;
                    }
                } 
                .eye {
                    min-width:72px;
                    width:auto;
                    height:30px;
                    margin-left:1%;
                    display: flex;
                    .eyeicon {
                        width:30px;
                        height:20px;
                        font-size:15px;
                        margin-top:9px;
                    }
                    p {
                        margin-top:5px;
                        margin-left:9px;
                    }
                }  
                .quote {
                    width:20px;
                    min-height:30px;
                    height:auto;
                    margin-left:3%;
                    .quoteicon {
                        font-size:16px;
                        margin-top:8px;
                    }
                    
                }
                .quoteList {
                    min-width:10px;
                    width:auto;
                    height:27px;
                    margin-left:10px;
                    margin-top:3px;
                    text-align: center;

                    .tag {
                        width:100%;
                        height:100%;
                        padding-right:12px;
                        padding-left:12px;
                        line-height:25px;
                        border-radius: 7px;
                        font-size:14px;
                    }
                }
                .app {
                    width:20px;
                    margin-left:6%;
                    margin-top:0.5px;
                    display: flex;   
                    .appstoreicon {
                       font-size:16px;
                       margin-top:8px; 
                    }
                    
                }
                .appList {
                    min-width:50px;
                    width:auto;
                    height:28px;
                    margin-left:10px;
                    margin-top:3px;
                    text-align: center;
                    border-radius: 7px;  
                   .tag {
                        width:100%;
                        height:100%;
                        padding-right:12px;
                        padding-left:12px;
                        line-height:25px;
                        border-radius: 7px;
                        font-size:14px;
                    }                
                }  
                @media screen and (min-width:1000px) and (max-width:1100px) {
                    .app {
                        margin-left:14%;
                    }
                }   
            }
        }
        .page {
            display: flex;
            width:60%;
            margin:5% auto;
        }    
    }
}
.Deletemodal {
    p {
        font-size:18px;
        margin-top:2%;
    }
}
.modifymodal {
    .content {
        width:100%;
        height:70vh;
        display: flex;
        .ModifybasicInfo {
            width:50%;
            height:100%;
            .title {
                display: block;
                width:75%;
                margin:6% auto;
            }
            .treeSelect {
                display: block;
                width:75%;
                margin:0 auto;
            }
            .kind {
                width:75%;
                display: block;
                margin:5% auto;
            }
            .brief {
                width:75%;
                display: block;
                margin:5% auto;
            }
        }
        .Edit {
            width:50%;
            height:100%;
            .Markdown {
                width:80%;
                display: block;
                margin:6% auto;
            }
        }
    }    
}
</style>


