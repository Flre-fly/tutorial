<template>
    <v-dialog
    v-model="dialog.visible"
    persistent
    max-width="700px"
>
    <v-card>
        <v-card-title>
            <span class="headline">파일 업로드</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="7">
                        <v-text-field
                            outlined
                            hide-details="auto"
                            readonly
                            v-model="dataUpload.selectedFileName"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="5" class="text-right">
                        <v-btn
                            color="primary"
                            class="text-none ml-auto"
                            depressed
                            @click="onButtonClick()"
                        >파일찾기</v-btn>
                        <v-btn
                            color="primary"
                            class="text-none ml-1"
                            depressed
                            @click="onFileUpload()"
                            >업로드</v-btn>
                        <v-btn
                            depressed
                            color="primary"
                            class="text-none ml-1"
                            @click="clear()"
                         >
                        취소
                        </v-btn>
                        <input
                            ref="uploader"
                            class="d-none"
                            id="hiddenFile"
                            type="file"
                            @change="onFileChanged"
                        />
                     </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</v-dialog>
</template>
<script>
import Vue from 'vue';
import ito from 'ito';
Vue.component('file-upload-dialog-component', async function(resolve) { resolve({
        "props": {
            "dialog": {
                "type": Object,
                "default": {
                    "visible": false,
                    "title": "파일 등록",
                    "data": {}
                }
            }
        },
        "data": function() {
            return {
                "dataUpload":{
                    "selectedFile" : null,
                    "selectedFileName" : null
                },
            }
        },
        "watch": {
            "dialog.visible": {
                "handler": function (n) {
                    if(!n) {
                        this.fileClear();
                    }
                }
            }
        },
        "methods": {
            "onButtonClick" : function (){
                this.isSelecting = true
                window.addEventListener('focus', () => {
                    this.isSelecting=false
                }, {once: true})
                this.$refs.uploader.click()
            },
            "onFileChanged": function(e) {
                this.dataUpload.selectedFile = e.target.files[0];
                if(this.dataUpload.selectedFile != undefined && this.dataUpload.selectedFile != null){
                    this.dataUpload.selectedFileName = this.dataUpload.selectedFile.name;
                }else{
                    this.dataUpload.selectedFileName=null;
                }
            },
            "onFileUpload" : async function() {
                var self = this;

                if(self.dataUpload.selectedFile != null && self.dataUpload.selectedFile.size > 0) {
                    this.$emit("upload", self.dataUpload);
                } else {
                    await ito.alert('파일을 선택해주세요.');
                }
            },
            "fileClear": function() {
                document.getElementById("hiddenFile").value = "";
                this.dataUpload.selectedFileName = null;
                this.dataUpload.selectedFile = null;
            },
            "clear": function() {
                this.dialog.visible = false;
            },
        },
    });
});
</script>