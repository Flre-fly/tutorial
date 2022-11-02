<template>
  <div>
    <v-row dense>
      <template v-if="check.language.items.length > 0">
        <v-col cols="12">
          <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
            <v-card-text>
              <v-row dense>
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <span>주언어<br />(3개선택)</span>
                </v-col>
                <v-col class="py-0 d-inline justify-center align-center">
                  <table>
                    <tbody>
                      <tr
                        style="border: 1px solid black"
                        v-for="(item, i) in check.language.items" :key="i"
                      >
                        <template v-if="item.parent !== undefined">
                          <td
                            class="text-center"
                            style="border-right: 1px solid black"
                            scope="row"
                          >
                            {{ item.parent.name }}
                          </td>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.language[i]"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                        <template v-else>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.language"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-if="check.role.items.length > 0">
        <v-col cols="12">
          <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
            <v-card-text>
              <v-row dense>
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <span>역할<br />(3개선택)</span>
                </v-col>
                <v-col class="py-0 d-inline justify-center align-center">
                  <table>
                    <tbody>
                      <tr
                        style="border: 1px solid black"
                        v-for="(item, i) in check.role.items" :key="i"
                      >
                        <template v-if="item.parent !== undefined">
                          <td
                            class="text-center"
                            style="border-right: 1px solid black"
                            scope="row"
                          >
                            {{ item.parent.name }}
                          </td>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.role[i]"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                        <template v-else>
                          <td scope="row">
                            <v-checkbox
                               :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.role"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-if="check.skill.items.length > 0">
        <v-col cols="12">
          <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
            <v-card-text>
              <v-row dense>
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <span>스킬&경험<br />(3개선택)</span>
                </v-col>
                <v-col class="py-0 d-inline justify-center align-center">
                  <table>
                    <tbody>
                      <tr
                        style="border: 1px solid black"
                        v-for="(item, i) in check.skill.items" :key="i"
                      >
                        <template v-if="item.parent !== undefined">
                          <td
                            class="text-center"
                            style="border-right: 1px solid black"
                            scope="row"
                          >
                            {{ item.parent.name }}
                          </td>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.skill[i]"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                        <template v-else>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.skill"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
      <template v-if="check.sector.items.length > 0">
        <v-col cols="12">
          <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
            <v-card-text>
              <v-row dense>
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <span>업무분야<br />(3개선택)</span>
                </v-col>
                <v-col class="py-0 d-inline justify-center align-center">
                  <table>
                    <tbody>
                      <tr
                        style="border: 1px solid black"
                        v-for="(item, i) in check.sector.items" :key="i"
                      >
                        <template v-if="item.parent !== undefined">
                          <td
                            class="text-center"
                            style="border-right: 1px solid black"
                            scope="row"
                          >
                            {{ item.parent.name }}
                          </td>
                          <td scope="row">
                            <v-checkbox
                             :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.sector[i]"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                        <template v-else>
                          <td scope="row">
                            <v-checkbox
                              :key = "t.id"
                              class="d-inline-block"
                              v-for="t in item.children"
                              :value="t.id"
                              :label="t.name"
                              v-model="data.sector"
                              style="margin: 0 5px !important"
                              :rules="[rules.required]"
                              hide-details="auto"
                            ></v-checkbox>
                          </td>
                        </template>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
import _ from 'lodash';
import Vue from "vue";
import ito from 'ito';
export default Vue.extend({
      props: {
        jobName: {
          type: String,
          default: "",
        },
      },
      data: function () {
        return {
          data: {
            language: [],
            role: [],
            skill: [],
            sector: [],
          },
          code: {
            language: {
              items: [],
            },
            role: {
              items: [],
            },
            skill: {
              items: [],
            },
            sector: {
              items: [],
            },
          },
          check: {
            language: {
              items: [],
            },
            role: {
              items: [],
            },
            skill: {
              items: [],
            },
            sector: {
              items: [],
            },
          },
          rules: {
            required: (value) => !!value || "필수",
          },
        };
      },
      watch: {
        "code.language.items": {
          handler: function () {
            let items,
              languageList,
              startsWith = this.code.language.items.find(
                (e) => e.name == this.jobName
              ).id;
            items = this.code.language.items.filter(
              (e) => e.id.startsWith(startsWith) && startsWith !== e.id
            );
            languageList = [];
            items.forEach((e, i) => {
              if (i === items.length - 1) {
                languageList[languageList.length - 1].children.push(e);
              } else if (e.id.length < items[i + 1].id.length) {
                languageList.push({
                  parent: e,
                  children: [],
                });
                this.data.language.push([]);
              } else {
                if (languageList.length === 0) {
                  languageList.push({
                    children: [],
                  });
                }
                languageList[languageList.length - 1].children.push(e);
              }
            });
            this.check.language.items = languageList;
          },
          deep: true,
        },
        "code.role.items": {
          handler: function () {
            let items,
              roleList,
              startsWith = this.code.role.items.find(
                (e) => e.name == this.jobName
              ).id;
            items = this.code.role.items.filter(
              (e) => e.id.startsWith(startsWith) && startsWith !== e.id
            );
            roleList = [];
            items.forEach((e, i) => {
              if (i === items.length - 1) {
                roleList[roleList.length - 1].children.push(e);
              } else if (e.id.length < items[i + 1].id.length) {
                roleList.push({
                  parent: e,
                  children: [],
                });
                this.data.role.push([]);
              } else {
                if (roleList.length === 0) {
                  roleList.push({
                    children: [],
                  });
                }
                roleList[roleList.length - 1].children.push(e);
              }
            });
            this.check.role.items = roleList;
          },
          deep: true,
        },
        "code.skill.items": {
          handler: function () {
            let items,
              skillList,
              startsWith = this.code.skill.items.find(
                (e) => e.name == this.jobName
              ).id;
            items = this.code.skill.items.filter(
              (e) => e.id.startsWith(startsWith) && startsWith !== e.id
            );
            skillList = [];
            items.forEach((e, i) => {
              if (i === items.length - 1) {
                skillList[skillList.length - 1].children.push(e);
              } else if (e.id.length < items[i + 1].id.length) {
                skillList.push({
                  parent: e,
                  children: [],
                });
                this.data.skill.push([]);
              } else {
                if (skillList.length === 0) {
                  skillList.push({
                    children: [],
                  });
                }
                skillList[skillList.length - 1].children.push(e);
              }
            });
            this.check.skill.items = skillList;
          },
          deep: true,
        },
        "code.sector.items": {
          handler: function () {
            let items,
              sectorList,
              startsWith = this.code.sector.items.find(
                (e) => e.name == this.jobName
              ).id;
            items = this.code.sector.items.filter(
              (e) => e.id.startsWith(startsWith) && startsWith !== e.id
            );
            sectorList = [];
            items.forEach((e, i) => {
              if (i === items.length - 1) {
                sectorList[sectorList.length - 1].children.push(e);
              } else if (e.id.length < items[i + 1].id.length) {
                sectorList.push({
                  parent: e,
                  children: [],
                });
                this.data.sector.push([]);
              } else {
                if (sectorList.length === 0) {
                  sectorList.push({
                    children: [],
                  });
                }
                sectorList[sectorList.length - 1].children.push(e);
              }
            });
            this.check.sector.items = sectorList;
          },
          deep: true,
        },
        "data.language": {
          handler: function (n, o) {
            if (typeof n[0] === "object") {
              n.forEach((e) => {
                if (e.length > 3) {
                  ito.alert("3개 이하만 가능합니다.");
                  this.data.language = _.cloneDeep(o);
                }
              });
            } else {
              if (n.length > 3) {
                ito.alert("3개 이하만 가능합니다.");
                this.data.language = _.cloneDeep(o);
              }
            }
            this.$emit("update:language", this.data.language);
          },
        },
        "data.role": {
          handler: function (n, o) {
            if (typeof n[0] === "object") {
              n.forEach((e) => {
                if (e.length > 3) {
                  ito.alert("3개 이하만 가능합니다.");
                  this.data.role = _.cloneDeep(o);
                }
              });
            } else {
              if (n.length > 3) {
                ito.alert("3개 이하만 가능합니다.");
                this.data.role = _.cloneDeep(o);
              }
            }
            this.$emit("update:role", this.data.role);
          },
        },
        "data.skill": {
          handler: function (n, o) {
            if (typeof n[0] === "object") {
              n.forEach((e) => {
                if (e.length > 3) {
                  ito.alert("3개 이하만 가능합니다.");
                  e.pop();
                  this.data.skill = _.cloneDeep(n);
                  return;
                }
              });
            } else {
              if (n.length > 3) {
                ito.alert("3개 이하만 가능합니다.");
                this.data.skill = _.cloneDeep(o);
              }
            }
            console.log(this.data.skill);
            this.$emit("update:skill", this.data.skill);
          },
        },
        "data.sector": {
          handler: function (n, o) {
            if (typeof n[0] === "object") {
              n.forEach((e) => {
                if (e.length > 3) {
                  ito.alert("3개 이하만 가능합니다.");
                  this.data.sector = _.cloneDeep(o);
                }
              });
            } else {
              if (n.length > 3) {
                ito.alert("3개 이하만 가능합니다.");
                this.data.sector = _.cloneDeep(o);
              }
            }
            this.$emit("update:sector", this.data.sector);
          },
        },
      },
      methods: {
        init: async function () {
          await this.getLanguageList();
          await this.getRoleList();
          await this.getTechnicList();
          await this.getSectorList();
        },
        getLanguageList: async function () {
          this.code.language.items = (
            await ito.auth.code("languages")
          ).data.items;
        },
        getRoleList: async function () {
          this.code.role.items = (await ito.auth.code("roles")).data.items;
        },
        getTechnicList: async function () {
          this.code.skill.items = (await ito.auth.code("skills")).data.items;
        },
        getSectorList: async function () {
          this.code.sector.items = (await ito.auth.code("sectors")).data.items;
        },
      },
      mounted: async function () {
        this.init();
      },
    });
</script>
