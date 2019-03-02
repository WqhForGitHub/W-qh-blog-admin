<template>
<div>
    <a-card class="blogList">
        <div class="title">
            <p>分类</p>
        </div>
        <div class="content">
            <div class="taglist">
                <div class="tag" v-for="(item, index) in taglist" :key="index">
                    <!-- <p :style="{color:item.color}">{{item.name}}</p> -->
                    <a-tag class="atag" :color="item.color">{{item.name}}
                         <a-icon class="delete" type="close" @click="Deleteclassify(index)" />
                    </a-tag>
                   
                </div>
                <div class="addtag" @click="addclassify">
                    <a-icon class="add" type="plus" />
                    <p>New Classify</p>
                </div>
            </div>
        </div>
    </a-card>
    <a-modal
      title="添加分类"
      class="kindmodal"
      v-model="addclassifymodal"
      okText="确认添加"
      cancelText="取消"
      @ok="confirmadd"
    >
    <div>
        <p>分类:</p>
        <a-input v-model="inputclassify" class="input" placeholder="请输入您要添加的分类"/>
    </div>
    </a-modal>
    <a-modal
      title="删除分类"
      class="Deletemodal"
      v-model="Deletemodal"
      okText="确认删除"
      cancelText="取消"
      @ok="confirmDelete"
    >
    <p>您确定要删除此条分类吗?</p>
    </a-modal>
</div>
</template>

<script>
import { statusCode } from '../api/api.cfg.js'
import { Deleteclassify, classifyList, addclassify } from '../api/index.js'
import axios from 'axios'
export default {
    data() {
        return {
             color:['green','red','orange',
            'cyan','blue','purple'],
            background:['green','red','orange',
            'cyan','blue','purple'],
            addclassifymodal:false,
            Deletemodal:false,
            inputclassify:'',
            taglist:[],
            index:0
        }
    },
    methods:{
        Deleteclassify(index) {
            this.index = index
            this.Deletemodal = true
        },
        // 确认删除
        async confirmDelete() {
            let Deleteid;
            this.taglist.forEach((item, indexone) => {
                if(this.index == indexone) {
                    Deleteid = item._id;
                }
            })
            const res = await Deleteclassify({
                methods:'Deleteclassify',
                id:Deleteid
            })
            if (res.status == statusCode.OK) {
                console.log(res);
                this.taglist.splice(this.index, 1) // 删除
                this.listclassify();
            }
            this.Deletemodal = false
        },
        async listclassify() {
            const res = await classifyList()
            if (res.status == statusCode.OK) {
                console.log(res.data);
                this.taglist = res.data;
                this.$store.commit({
                    type:'changeclassifylist',
                    tagList:this.taglist
                })
            }
        },
        addclassify() {
            this.addclassifymodal = true
        },
        // 确认添加分类
        async confirmadd() {
            let colornum = Math.floor(Math.random()*6);
            let backgroundnum = Math.floor(Math.random()*6);
            let addclassifyitem = {
                methods:'insertclassify',
                classifyname:this.inputclassify,
                color:this.color[colornum],
                backgroundColor:this.background[backgroundnum]
            }
            const res = await addclassify({
                methods:'insertclassify',
                classifyname:this.inputclassify,
                color:this.color[colornum],
                backgroundColor:this.background[backgroundnum]
            })
            if (res.status == statusCode.OK) {
                console.log(res);
                this.taglist.push(addclassifyitem)  // 添加项
                this.listclassify();
            }
            this.addclassifymodal = false
        }
    },
    mounted() {
        this.listclassify();
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
            width:90%;
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
                border-radius:5px;
                .atag {
                    width:100%;
                    height:100%;
                    padding-left:15px;
                    font-size:13px;
                    .delete {
                        line-height: 30px;
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
.kindmodal {
    div {
        display: flex;
        p {
            font-size:15px;
            line-height:30px;
        }
        .input {
            width:50%;
            margin-left:5%;
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


