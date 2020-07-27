Repository for classes at Rocketseat on Bootcamp GoStack 12

# Recuperação de senha
	**RF**
		- O usuario deve poder recuperar sua senha informando o seu email ;
		- O usuario deve receber um email com instruções de recuperação de senha;
		- O usuário deve poder resetar sua senha;

	**RNF**
		- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento(É uma ferramenta que serve como serviço de email falso);
		- Utilizar o Amazon SES para envios em produção;
		- O envio de emails deve acontecer em segundo plano(backgound job);

	**RN**
		- O link enviado por email para resetar senha deve expirar em 2horas;
		- O usuário precisa confirmar a nova senha ao resetar a mesma;

# Atualização do perfil
	**RF**
		- O usuario deve poder atualizar seu nome, email, e senha;

	**RNF**

	**RN**
		- O usuário não pode alterar seu email para um email já utilizado;
		- Para atualizar a senha, o usuário deve informar a senha antiga;
		- Para atualizar a senha, o usuário deve confirmar a nova senha

# Painel do prestador
	**RF**
		- O usuário deve poder listar seus agendamentos de um dia especifico;
		- O prestador deve receber uma notificação sempre que houver um novo agendamento;
		- O prestador deve poder visualizar as notificações não lidas

	**RNF**
		- Os agendamentos do prestador no dia devem ser armazenados em cache;
		- As notificações do prestador devem ser armazenadas no MongoDB;
		- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

	**RN**
		- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar

# Agendamento de serviços

	**RF**
		- O usuário deve poder listar os prestadores de serviços;
		- O usuário deve poder listar os dias de um mês com pelo menos um horário disponiveis de um prestador;
		- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
		- O usuario deve poder realizar um novo agendamento com um prestador;

	**RNF**
		- A listagem de prestadores deve ser armazenada em cache;

	**RN**
		- Cada agendamento deve durar 1h;
		- Os agendamentos devem estar disponíveis entre as 8h as 18h;
		- O usuário não pode agendar em um horário já ocupado;
		- O usuário não pode agendar em um horário que já passou;
		- O usuário não pode agendar serviços consigo mesmo;
