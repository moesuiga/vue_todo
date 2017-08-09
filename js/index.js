var vm = new Vue({
	el: "#app",
	data: {
		data: JSON.parse(localStorage.getItem('like_todos_data')) || [],
		id: 0,
		thing: '',
	},
	methods: {
		// 添加数据
		addThing: function(){
			if(this.thing == ''){
				alert('请输入内容后添加');
				return;
			}
			// 循环数据，得到当前最大id
			for(var i = 0; i < this.data.length; i++){
				if(this.data[i].id > this.id){
					this.id = this.data[i].id;
				}
			}
			var o = {id: this.id+1, thing: this.thing, isFinished: false, isEditing: false}
			this.data.push(o);

			// 更新数据后，保存到本地
			this.saveData();

			// 清除表单数据
			this.thing = '';
		},

		// 保存数据到本地
		saveData: function(){
			localStorage.setItem('like_todos_data', JSON.stringify(this.data));
		},

		// 根据id删除一条数据
		delThing: function(id){
			// 先确认是否删除
			if(!confirm('确认删除吗？')){
				return;
			}
			for(var i = 0; i < this.data.length; i++){
				if(this.data[i].id == id){
					this.data.splice(i,1);
					this.saveData();
					return;
				}
			}
		},

		// 双击文本内容，编辑内容
		editData: function(isFinished,id){
			// 如果已完成，没必要编辑
			if(isFinished){
				return;
			}
			for(var i = 0; i < this.data.length; i++){
				if(this.data[i].id == id){
					this.data[i].isEditing = true;
					var _this = this;
					return setTimeout(function(){
						_this.$refs.editInput[i].focus();
					},0)
				}
			}
		},

		// 编辑好内容后，失去焦点，退出编辑，并保存数据
		editOver: function(id){
			for(var i = 0; i < this.data.length; i++){
				if(this.data[i].id == id){
					this.data[i].isEditing = false;
					if(this.data[i].thing == ''){
						// 如果为空，不保存直接返回原数据
						this.data = JSON.parse(localStorage.getItem('like_todos_data'));
						return;
					}
					break;
				}
			}
			this.saveData();
		}
	},
	filters: {
		// 计算已完成数目
		finished: function(data){
			var l = 0;
			for(var i = 0; i < data.length; i++){
				if(data[i].isFinished){
					l++;
				}
			}
			return l;
		},
		// 计算未完成数目
		notFinished: function(data){
			var l = 0;
			for(var i = 0; i < data.length; i++){
				if(!data[i].isFinished){
					l++;
				}
			}
			return l;
		}
	}
});
