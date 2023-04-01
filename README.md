# Whatsapp-conversation-manager
This is a very basic Web interface to send and manage your Whatsapp Business templates

You need to create a "secret.php" file which contains all the API keys to your WhatsApp Business Account.
You also need to set up a hook that your WhatsApp Business API can connect to (received and sent messages are sent to this hook by the WhatsApp API so you can store them in you DB).

The 2 pages that are interesting are:
showtemplates
create_flow_oop

showtemplates lists all the Templates that you have saved/created on your WhatsApp Business dashboard and allows you to choose a template.
After you choose the template you are asked to input your variables for the template.
In the final step you can choose a number to send the template to. You can only choose numbers that you already had a conversation with.

create_flow_oop has a graphical interface which allows you to create conversation flows. Basically automated responses.
It is very basic still and only supports text based answers (even tho the interface for template responses is already there, it is not yet implemented in the backend).
