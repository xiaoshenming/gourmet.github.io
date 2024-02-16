new Vue({
  el: "#app",
  data: {
    loggedIn: false,
    chooseA: false,
    chooseB: true,
    chatList: [],
    chatListme: [],
    inputMessage: "",
    lookbox: null,
    chatTable: [],
    show: 0,
    selectedImage: null,
  },

  computed: {
    showBox6() {
      if (this.chatTable.length > 0) {
        if (this.show === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.show === 1) {
          return true;
        } else {
          return false;
        }
      }
    },
  },

  methods: {
    handleKeyDown(event) {
      if (event.code === "Enter" && event.shiftKey) {
        // 如果按下 Ctrl+Enter，则执行换行操作
        this.inputMessage += "\n";
      } else if (event.code === "Enter") {
        // 如果按下 Enter（不按 Ctrl 键），则执行发送消息操作
        event.preventDefault(); // 阻止默认的换行操作
        this.sendMessage();
      }
    },
    handleImageUpload() {
      const file = document.getElementById("imageInput").files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.selectedImage = reader.result;
        // 获取图片文件名
        const imageName = file.name;
        // 将图片文件名赋值给item.message
        this.inputMessage = imageName;
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    handleLogin() {
      this.loggedIn = true;
      this.initChatList(); // 在登录成功后调用初始化聊天数据的方法

      //this.syncChatTable(); // 将通讯录中的用户同步到聊天消息表
    },
    sendMessage() {
      if (this.inputMessage || this.selectedImage) {
        const newMessage = {
          id: Date.now(),
          message: this.inputMessage,
          image: this.selectedImage,
          time: new Date().toLocaleTimeString(),
        };

        // 将新消息添加到对应联系人的聊天记录中
        this.lookbox.messages.push(newMessage);

        // 更新对应联系人的最新消息和时间
        this.lookbox.message = this.inputMessage || "图片";
        this.lookbox.time = newMessage.time;

        // 更新聊天消息表中的对应联系人的最新消息和时间
        const contactIndex = this.chatTable.findIndex(
          (contact) => contact.id === this.lookbox.id
        );
        if (contactIndex !== -1) {
          this.chatTable[contactIndex].message = this.inputMessage || "图片";
          this.chatTable[contactIndex].time = newMessage.time;
        }

        this.inputMessage = "";
        this.selectedImage = null;

        // 添加联系人到chatTable中
        if (contactIndex === -1) {
          this.chatTable.push({
            id: this.lookbox.id,
            avatar: this.lookbox.avatar,
            name: this.lookbox.name,
            time: this.lookbox.time,
            message: this.lookbox.message,
          });
        }
        setTimeout(() => {
          // 获取滚动容器元素
          var container = document.querySelector(".box7");
          // 滚动到底部
          container.scrollTop = container.scrollHeight - container.clientHeight;
        }, 0);

        // 将该联系人移动到最上面
        const movedContact = this.chatTable.splice(contactIndex, 1)[0];
        this.chatTable.unshift(movedContact);

        // 将被删除的联系人添加到chatTable中
        this.chatTable.push({
          id: contact.id,
          avatar: contact.avatar,
          name: contact.name,
          time: contact.time,
          message: contact.message,
        });
      }
    },

    deleteContact(contact) {
      const index = this.chatTable.findIndex((c) => c.id === contact.id);
      if (index !== -1) {
        this.chatTable.splice(index, 1);
        // const chatIndex = this.chatList.findIndex(c => c.id === contact.id);
        // if (chatIndex !== -1) {
        //     this.chatList.splice(chatIndex, 1);
        // }
      }
      this.show = 0; // 点击通讯录中的任意一个用户时，恢复 box6，并暂停 showBox6 的计算
    },
    syncChatTable() {
      this.chatTable = this.chatList.map((contact) => {
        return {
          id: contact.id,
          avatar: contact.avatar,
          name: contact.name,
          time: contact.time,
          message: contact.message,
        };
      });
    },

    // 选择不同的用户切换不同的视图
    choseUser(int) {
      this.id = int;
      this.lookbox = this.chatList.find((contact) => contact.id === int);
      // 将选定联系人的聊天记录赋值给chatListme数组
      this.chatListme = this.lookbox.messages;
      this.inputMessage = "";
      this.show = 1; // 点击通讯录中的任意一个用户时，恢复 box6，并暂停 showBox6 的计算
    },

    // 选择通讯录或者聊天信息表
    click(target) {
      if (target === "message") {
        this.chooseA = false;
        this.chooseB = true;
        this.show = 0; // 点击通讯录中的任意一个用户时，恢复 box6，并暂停 showBox6 的计算
      } else if (target === "contacts") {
        this.chooseA = true;
        this.chooseB = false;
      }
    },

    initChatList() {
      // 添加聊天记录到chatList数组中
      this.chatList.push(
        {
          id: 1,
          avatar: "../images/login/头像1.jpg",
          name: "张三",
          time: "",
          message: "",
        },
        {
          id: 2,
          avatar: "../images/login/头像2.jpg",
          name: "李四",
          time: "",
          message: "",
        },
        {
          id: 3,
          avatar: "../images/login/头像3.jpg",
          name: "王五",
          time: "",
          message: "",
        },
        {
          id: 4,
          avatar: "../images/login/头像4.jpg",
          name: "赵六",
          time: "",
          message: "",
        },
        {
          id: 5,
          avatar: "../images/login/头像5.jpg",
          name: "孙七",
          time: "",
          message: "",
        },
        {
          id: 6,
          avatar: "../images/login/头像6.jpg",
          name: "周八",
          time: "",
          message: "",
        },
        {
          id: 7,
          avatar: "../images/login/头像7.jpg",
          name: "吴九",
          time: "",
          message: "",
        },
        {
          id: 8,
          avatar: "../images/login/头像8.jpg",
          name: "郑十",
          time: "",
          message: "",
        },
        {
          id: 9,
          avatar: "../images/login/头像9.jpg",
          name: "小明",
          time: "",
          message: "",
        },
        {
          id: 10,
          avatar: "../images/login/头像10.jpg",
          name: "大明",
          time: "",
          message: "",
        },
        {
          id: 11,
          avatar: "../images/login/头像11.jpg",
          name: "闪电侠",
          time: "",
          message: "",
        },
        {
          id: 12,
          avatar: "../images/login/头像12.jpg",
          name: "钢铁侠",
          time: "",
          message: "",
        },
        {
          id: 13,
          avatar: "../images/login/头像13.jpg",
          name: "派蒙",
          time: "",
          message: "",
        },
        {
          id: 12,
          avatar: "../images/login/头像14.jpg",
          name: "旅行者",
          time: "",
          message: "",
        }
      );
      // 为每个联系人添加一个存储聊天记录的数组属性
      this.chatList.forEach((contact) => {
        contact.messages = [];
      });

      // 对chatList数组进行排序，根据最新消息的时间倒序排序
      this.chatList.sort((a, b) => {
        if (a.messages.length > 0 && b.messages.length > 0) {
          const lastAMessage = a.messages[a.messages.length - 1];
          const lastBMessage = b.messages[b.messages.length - 1];
          return new Date(lastBMessage.time) - new Date(lastAMessage.time);
        }
        return 0;
      });
    },
  },
});
