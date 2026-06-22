$(() =>
{
	class Message
	{
		constructor(time, body, sender_id, recipient_id)
		{
			this.time = time;
			this.body = body;
			this.sender_id = sender_id;
			this.recipient_id = recipient_id;
		}

		render() {
			return $('<div/>', {class: ''}).append(
				this.body,
				$(`<span>${this.time}</span>`)
			);
		}
	}

	class User
	{
		constructor(id, name, img)
		{
			this.id = id;
			this.name = name;
			this.img = img;
			this.isActive = false;
		}

		render()
		{
			const user = $('<div/>').append(
				$(`<img src="${this.img}" width="36" height="36" alt="img">`),
				this.name
			).attr('title', '#' + this.id);

			user.on('click', () =>
			{
				if (this.isActive) return false;

				for (const user of users) user.isActive = false;
				this.isActive = true;

				$('div.right > div.info').text(this.name)
				this.renderMessages();
			});

			return user;
		}

		renderMessages()
		{
			console.log(messages);
			const our_messages = messages
				.filter(value =>
				value.sender_id === currentUser.id && value.recipient_id === this.id
				||
				value.sender_id === this.id && value.recipient_id === currentUser.id
			).sort((a, b) => a.time - b.time);

			const messages_element = $('div.messages');
			messages_element.html('');
			for (const m of our_messages)
			{
				messages_element.append($('<div/>', {class: m.sender_id === MY_ID ? 'my' : 'your'}).append(
					m.body,
					$(`<span>${m.time}</span>`)
				));
			}
		}
	}

	const MY_ID = 999;
	const currentUser = new User(MY_ID, 'Pupochek', 'images/pes.jpg')

	const textarea = $('div.textfield > div > textarea');
	const button = $('div.textfield > div > button');
	const messageContainer = $('div.right > div.messages');

	function getCurrentDate()
	{
		const now = new Date();

		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();
		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
	}

	button.on('click', () =>
	{
		const messageBody = textarea.val();
		const date = getCurrentDate();
		messages.push({
			body: messageBody,
			sender_id: currentUser.id,
			recipient_id: users.filter(value => value.isActive)[0].id,
			time: date,
		})

		console.log(messages);

		const myMessage = $('<div class="my"/>').text(messageBody);
		messageContainer.append(
			myMessage.append(
				$('<span/>', {text: date})
			)
		);
	});

	const messages = [
		{
			body: 'Саламу алейкум, брат',
			sender_id: currentUser.id,
			recipient_id: 1,
			time: 12,
		},
		{
			body: 'Привет',
			sender_id: 1,
			recipient_id: currentUser.id,
			time: 10,
		},
		{
			body: 'займи 5к, умоляю...',
			sender_id: 35,
			recipient_id: currentUser.id,
			time: 75,
		},
		{
			body: 'Прикинь че узнал про настюху...',
			sender_id: 14,
			recipient_id: 115,
			time: 13,
		}
	];

	const users = [
		new User(1, 'petux1', 'images/pes.jpg'),
		new User(2, 'Vasek', 'images/pes.jpg'),
	];

	const userlist = $('div.userlist');
	for (const user of users)
	{
		userlist.append(user.render());
	}

});