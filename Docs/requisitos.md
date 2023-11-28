# Requisitos funcionais e não funcinais

## Requisitos funcionais:

### RF1: Registro de Usuários
O sistema deve permitir que os usuários se registrem fornecendo um nome, um endereço de e-mail e uma senha. 

### RF2: Autenticação de Usuários
O sistema deve permitir que os usuários façam login usando seu endereço de e-mail e senha registrados.

### RF3: Criação de Tarefas
Os usuários autenticados devem poder criar novas tarefas, fornecendo um título, uma descrição, uma data de vencimento opcional e outras informações relevantes.

### RF4: Edição de Tarefas
Os usuários autenticados devem poder editar as informações de tarefas existentes, como título, descrição e data de vencimento.

### RF5: Exclusão de Tarefas
Os usuários autenticados devem poder excluir tarefas que não são mais necessárias.

### RF6: Marcação de Tarefas como Concluídas
Os usuários autenticados devem poder marcar tarefas como concluídas ou não concluídas.

### RF7: Visualização de Lista de Tarefas
Os usuários autenticados devem poder visualizar suas listas de tarefas, incluindo tarefas pendentes e concluídas.


## Requisitos Não Funcionais:

### RNF1: Desempenho
O sistema deve ser responsivo e garantir tempos de resposta rápidos, mesmo quando muitos usuários estiverem usando simultaneamente.

### RNF2: Escalabilidade
O sistema deve ser escalável para lidar com um aumento no número de usuários e tarefas. O banco de dados deve ser capaz de dimensionar verticalmente ou horizontalmente, conforme necessário.

### RNF3: Segurança
Os dados do usuário (como senhas) devem ser armazenados de forma segura e protegidos contra acesso não autorizado.
A autenticação e a autorização devem ser implementadas adequadamente para proteger as informações do usuário.

### RNF4: Backup e Recuperação
Deve ser implementado um plano de backup regular para proteger os dados do usuário contra perda acidental.

### RNF5: Conformidade com Regulamentações
O sistema deve cumprir as regulamentações de privacidade de dados aplicáveis, como o Regulamento Geral de Proteção de Dados (GDPR) ou regulamentos locais semelhantes, se aplicável.

### RNF6: Disponibilidade
O sistema deve estar disponível 24 horas por dia, 7 dias por semana, com o mínimo de tempo de inatividade planejado para manutenção.

### RNF7: Portabilidade
O sistema deve ser projetado de forma a permitir futuras migrações de banco de dados, se necessário, sem interromper o serviço.

### RNF8: Testabilidade
O sistema deve ser projetado de forma a permitir testes automatizados, incluindo testes de unidade, integração e teste de carga.

### RNF9: Usabilidade
A interface do usuário deve ser intuitiva e fácil de usar, tornando a criação e gerenciamento de tarefas uma experiência agradável para os usuários.
