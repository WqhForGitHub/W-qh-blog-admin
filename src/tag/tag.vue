<template>
<div>
    <a-card class="blogList">
        <div class="title">
            <p>标签</p>
        </div>
        <div class="content">
            <div class="taglist">
                <div class="tag" v-for="(item, index) in taglist" :key="index">
                    <!-- <p :style="{color:item.color}" >{{item.tagname}}</p> -->
                    <a-tag class="atag" :color="item.color">{{item.tagname}}
                         <a-icon class="delete" type="close" @click="DeleteTag(index)" />
                    </a-tag>
                   
                </div>
                <div class="addtag" @click="addTag">
                    <a-icon class="add" type="plus" />
                    <p>New Tag</p>
                </div>
            </div>
        </div>
    </a-card>
    <a-modal
      title="添加标签"
      :visible="addModal"
      okText="确认添加"
      cancelText="取消"
      @ok="comfirmAddTag"
      @cancel="cancel"
      class="addmodal"
    >
    <div class="tag">
        <p>标签名:</p>
        <a-input v-model="Tagname" class="tagname" placeholder="请输入要添加的标签名"/>
    </div>
    </a-modal>
    <a-modal
      title="删除标签"
      :visible="DeleteModal"
      okText="确认删除"
      cancelText="取消"
      @ok="openTagmodal"
      @cancel="CancelTagmodal"
    >
      <p>您要删除此条标签吗?</p>
    </a-modal>
</div>
</template>

<script>
import { Deletetag, fingtag, addtag } from '../api/index.js'
import { statusCode } from '../api/api.cfg.js'
export default {
    data() {
        return {
            color:['green','red','orange',
            'cyan','blue','purple'],
            background:['green','red','orange',
            'cyan','blue','purple'],
            addModal:false,
            DeleteModal:false,
            index:0,
            Tagname:'',
            taglist:[]
        }
    },
    methods:{
        async openTagmodal() {
            let id = ''
            this.taglist.forEach((item, indexone) => {
                if(this.index == indexone) {
                     id = item._id
                }
            })
            const res = await Deletetag({
                methods:'DeleteTag',
                tagid:id
            })
            if (res.status == statusCode.OK) {
                console.log(res)
                this.taglist.splice(this.index, 1)
            }
            this.DeleteModal = false
        },
        CancelTagmodal() {
            this.DeleteModal = false
        },
        // 删除标签
        DeleteTag(index) {
            this.DeleteModal = true
            this.index = index
        },
        // 获得标签
        async getTag() {
            const res = await fingtag()
            if (res.status == statusCode.OK) {
                console.log(res);
                this.taglist = res.data
                this.$store.commit({
                    type:'changetaglist',
                    tagList:this.taglist
                })
            }
        },
        addTag() {
            this.addModal = true
        },
        // 确认添加
        async comfirmAddTag() {
            let colornum = Math.floor(Math.random()*6);
            let backgroundnum = Math.floor(Math.random()*6);
            // 添加的对象
            let addTag = {
                methods:'Taginsert',
                tagname:this.Tagname,
                color:this.color[colornum],
                backgroundColor:this.background[backgroundnum]
            }
            const res = await addtag({
                methods:'Taginsert',
                tagname:this.Tagname,
                color:this.color[colornum],
                backgroundColor:this.background[backgroundnum]
            })
            if (res.status == statusCode.OK) {
                console.log(res)
                this.taglist.push(addTag)
                // 刷新获取数据库
                this.getTag();
            }
           this.addModal = false
        },
        // 取消
        cancel() {
            this.addModal = false
        }
    },
    mounted() {
        this.getTag();
    }
}
</script>

<style lang="less" scoped>
.blogList {
    width:92%;
    min-height:520px;
    height:auto;
    margin:0.5% 1%;
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
        min-height:450px;
        height:auto;
        display: flex;
        flex-wrap: wrap;
        .taglist {
            width:95%;
            height:80px;
            display: flex;
            flex-wrap: wrap;
            margin-top:4%;
            .tag {
                min-width:2%;
                width:auto;
                height:28px;
                margin-left:2%;
                margin-top:1.5%;
                display: flex;
                border-radius:4px;
                // border:1px solid gray; 
                // p {
                //     text-align: center;
                //     line-height: 26px;
                //     padding-left:10px;
                //     padding-right:10px;
                // }
                .atag {
                    width:100%;
                    height:100%;
                    text-align: center;
                    line-height: 26px;
                    padding-left:10px;
                    padding-right:10px;
                    font-size:13px;
                    .delete {
                        line-height: 29.5px;
                        font-size:12px;
                        padding-right: 5px;
                    }
                }
                
            }
            .addtag {
                min-width:10%;
                width:auto;
                height:28px;
                margin-left:2%;
                margin-top:1.5%;
                display: flex;
                border-radius:5px;
                border:1px dashed gray;    
                .add {
                    margin-top:6%;
                    padding-left:8px;
                }
                p {
                    font-size:14px;
                    line-height: 25px;
                    padding-left:10px;
                    padding-right:8px;
                }
            }
        }
    }
}
.addmodal {
    .tag {
        width:100%;
        height:30px;
        display: flex;
        p {
            line-height:30px;
        }
        .tagname {
            width:50%;
            margin-left:3%;
        }
    }
}





@media screen and (max-width:1024px) {
    .tag {
        margin-top:2%;
    }    
    .addtag {
        margin-top:2%;
    }
}
@media screen and (max-width:768px) {
    .blogList {
        width:92%;
        position:absolute;
    }
}
</style>


