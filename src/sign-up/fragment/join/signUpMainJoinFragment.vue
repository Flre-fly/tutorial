<template>
  <div>
    <v-form ref="userForm">
      <v-row dense>
        <v-col cols="12">
          <v-text-field
            dense
            outlined
            clearable
            label="이름(필수)"
            :rules="[rules.required]"
            validate-on-blur
            hide-details="auto"
            v-model="data.person.name"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="off"
            dense
            outlined
            clearable
            label="아이디(필수)"
            :rules="[rules.required]"
            validate-on-blur
            hide-details="auto"
            v-model="data.user.username"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="new-password"
            dense
            outlined
            clearable
            :type="text.type"
            :append-icon="text.icon"
            label="비밀번호(필수)"
            @click:append="showPassword()"
            :rules="[rules.required, rules.password]"
            validate-on-blur
            hide-details="auto"
            v-model="data.user.password"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="new-password"
            dense
            outlined
            clearable
            :type="text.type"
            :append-icon="text.icon"
            label="비밀번호 확인"
            @click:append="showPassword()"
            :rules="[rules.samePassword]"
            validate-on-blur
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <date-picker-component
            dense
            outlined
            hide-details
            label="생일(필수)"
            append-icon="mdi-calendar"
            v-model="data.person.birthDate"
            :rules="[rules.required]"
          ></date-picker-component>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="off"
            dense
            outlined
            clearable
            label="휴대폰(필수)"
            :rules="[rules.required, rules.phone]"
            validate-on-blur
            hide-details="auto"
            v-model="data.person.phoneNumber"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="off"
            dense
            outlined
            clearable
            label="이메일(필수)"
            :rules="[rules.required, rules.email]"
            validate-on-blur
            hide-details="auto"
            v-model="data.person.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            autocomplete="off"
            dense
            outlined
            clearable
            label="웹사이트"
            hide-details="auto"
            v-model="data.person.website"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-row dense>
            <v-col cols="4" md="2">
              <v-text-field
                :value="data.person.postcode"
                background-color="#e9ecef"
                dense
                outlined
                label="우편번호"
                readonly
                hide-details="auto"
                @click="setAddress"
              ></v-text-field>
            </v-col>
            <v-col cols="8" md="10">
              <v-text-field
                :value="data.person.address"
                background-color="#e9ecef"
                outlined
                dense
                readonly
                hide-details="auto"
                label="기본주소"
                @click="setAddress"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-text-field
            :value="data.person.detailAddress"
            outlined
            hide-details="auto"
            dense
            label="상세주소"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-card outlined style="border-color: rgba(0, 0, 0, 0.42) !important">
            <v-card-text>
              <v-row>
                <v-col cols="auto">
                  <span>직종</span>
                </v-col>
                <v-col class="py-0 d-flex justify-center align-center">
                  <v-radio-group
                    :rules="[rules.required]"
                    style="margin: 5px 0 !important"
                    v-model="data.person.jobType"
                    row
                    hide-details
                  >
                    <v-radio
                      v-for="t in radio.job.items"
                      :label="t.name"
                      :value="t.id"
                      :key="t.name"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
//완
import ito from "ito";
import Vue from "vue";
import moment from "moment";
import DatePickerComponent from "@/components/PickerDatePickerComponent.vue";
export default Vue.extend({
   components: {
        DatePickerComponent
    },
  data: function () {
    return {
      data: {
        person: {},
        user: {},
        role: {
          id: null,
        },
      },
      radio: {
        job: {
          items: [],
        },
      },
      idExists: true,
      text: {
        icon: "mdi-eye-off-outline",
        type: "password",
      },
      rules: {
        required: (value) => !!value || "필수",
        password: (value) => {
          let message, flag;
          flag = false;
          if (value == null || value.length < 8) {
            message = "비밀번호 8자 이상";
          } else if (
            !/(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/g.test(
              value
            )
          ) {
            message = "영문자 숫자 특수문자 조합";
          } else if (/(\w)\1\1/.test(value)) {
            message = "동일한 3자리 문자";
          } else if (!this.stck(value, 3)) {
            message = "연속된 3자리 문자";
          } else if (
            value.indexOf(moment(this.data.person.birthDate).format("MMDD")) !==
            -1
          ) {
            message = "생년월일 포함";
          } else if (value.indexOf(this.data.user.username) !== -1) {
            message = "아이디 포함";
          } else {
            flag = true;
          }
          return flag || message;
        },
        email: (value) => {
          let message, flag;
          flag = false;
          if (
            !/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
              value
            )
          ) {
            message = "유효한 이메일이 아닙니다.";
          } else {
            flag = true;
          }
          return flag || message;
        },
        samePassword: (value) => {
          return this.data.user.password === value || "비밀번호가 다릅니다.";
        },
        phone: (value) => {
          let message, flag;
          flag = false;
          if (
            !/^01([0|1|6|7|8|9]?)-{0,1}?([0-9]{3,4})-{0,1}?([0-9]{4})$/gi.test(
              value
            )
          ) {
            message = "형식이 맞지 않습니다.";
          } else {
            flag = true;
          }
          return flag || message;
        },
      },
      confirmPassword: null,
    };
  },
  watch: {
    "data.person": {
      handler: function (n) {
        this.$emit("update:person", n);
      },
      deep: true,
    },
    "data.user": {
      handler: function (n) {
        this.$emit("update:user", n);
      },
      deep: true,
    },
  },
  methods: {
    init: async function () {
      await this.getJobTypeList();
    },
    getJobTypeList: async function () {
      this.radio.job.items = (await ito.auth.code("jobs")).data.items;
      this.radio.job.items.shift();
    },
    stck: function (str, limit) {
      var o,
        d,
        p,
        n = 0,
        l = limit == null ? 4 : limit;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (
          i > 0 &&
          (p = o - c) > -2 &&
          p < 2 &&
          (n = p == d ? n + 1 : 0) > l - 3
        )
          return false;
        d = p;
        o = c;
      }
      return true;
    },
    showPassword: function () {
      if (this.text.icon == "mdi-eye-off-outline") {
        this.text.icon = "mdi-eye-outline";
        this.text.type = "text";
      } else {
        this.text.icon = "mdi-eye-off-outline";
        this.text.type = "password";
      }
    },
    setAddress: async function () {
      var self = this,
        data,
        address,
        detailAddress;
      data = await ito.util.getPostcode();
      if (data) {
        if (data.userSelectedType === "R") {
          address = data.roadAddress;
          detailAddress = "";
          if (data.bname && data.bname !== "") {
            detailAddress += data.bname;
          }
          if (data.buildingName && data.buildingName !== "") {
            detailAddress +=
              detailAddress !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          address += detailAddress !== "" ? " (" + detailAddress + ")" : "";
        } else {
          address = data.jibunAddress;
        }
        this.$set(self.data.person, "postcode", data.zonecode);
        this.$set(self.data.person, "address", address);
        self.$emit("update", self.data);
      }
    },
  },
  created: async function () {
    this.init();
  },
});
</script>
