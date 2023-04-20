import { SubmitKey } from "../store/app";


const ru = {
    WIP: "WIP...",
    Error: {
        Unauthorized:
            "Unauthorized access, please enter access code in settings page.",
    },
    ChatItem: {
        ChatItemCount: (count: number) => `${count} сообщений`,
    },
    Chat: {
        SubTitle: (count: number) => `${count} сообщений от Djipiti`,
        Actions: {
            ChatList: "К списку чатов",
            CompressedHistory: "Compressed History Memory Prompt",
            Export: "Экспортировать все выделенные сообщения",
            Copy: "Копировать",
            Stop: "Стоп",
            Retry: "Повторить",
        },
        Rename: "Переименовать чат",
        Typing: "Печатает…",
        Input: (submitKey: string) => {
            var inputHints = `${submitKey} чтобы отправить`;
            if (submitKey === String(SubmitKey.Enter)) {
                inputHints += ", Shift + Enter чтобы начать писать с новой строки";
            }
            return inputHints + "";
        },
        Send: "Отправить",
    },
    Export: {
        Title: "Все сообщения",
        Copy: "Скопировать",
        Download: "Скачать",
        MessageFromYou: "Вы",
        MessageFromChatGPT: "Сообщение Djipiti",
    },
    Memory: {
        Title: "Memory Prompt",
        EmptyContent: "Nothing yet.",
        Send: "Send Memory",
        Copy: "Copy Memory",
        Reset: "Удалить чат",
        ResetConfirm:
            "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
    },
    Home: {
        NewChat: "Новый чат",
        DeleteChat: "Подтвердите удаление чата",
        DeleteToast: "Чат удален",
        Revert: "Восстановить",
    },
    Settings: {
        Title: "Настройки",
        SubTitle: "Все Настройки",
        Actions: {
            ClearAll: "Clear All Data",
            ResetAll: "Сбрросить настройки",
            Close: "Закрыть",
            ConfirmResetAll: {
                Confirm: "Вы уверены, что хотите сбросить все настройки?",
            },
            ConfirmClearAll: {
                Confirm: "Вы уверены, что хотите удалить все чаты",
            },
        },
        Lang: {
            Name: "Язык", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
            Options: {
                ru:"Русский",
                cn: "简体中文",
                en: "English",
                tw: "繁體中文",
                es: "Español",
                it: "Italiano",
                tr: "Türkçe",
                jp: "日本語",
            },
        },
        Avatar: "Ваш аватар",
        FontSize: {
            Title: "Размер шрифта",
            SubTitle: "Изменение размера шрифта",
        },
        Update: {
            Version: (x: string) => `Version: ${x}`,
            IsLatest: "Latest version",
            CheckUpdate: "Check Update",
            IsChecking: "Checking update...",
            FoundUpdate: (x: string) => `Found new version: ${x}`,
            GoToUpdate: "Update",
        },
        SendKey: "Send Key",
        Theme: "Тема",
        TightBorder: "Tight Border",
        SendPreviewBubble: "Send Preview Bubble",
        Prompt: {
            Disable: {
                Title: "Disable auto-completion",
                SubTitle: "Input / to trigger auto-completion",
            },
            List: "Prompt List",
            ListCount: (builtin: number, custom: number) =>
                `${builtin} built-in, ${custom} user-defined`,
            Edit: "Edit",
        },
        HistoryCount: {
            Title: "Attached Messages Count",
            SubTitle: "Number of sent messages attached per request",
        },
        CompressThreshold: {
            Title: "History Compression Threshold",
            SubTitle:
                "Will compress if uncompressed messages length exceeds the value",
        },
        Token: {
            Title: "API Key",
            SubTitle: "Use your key to ignore access code limit",
            Placeholder: "OpenAI API Key",
        },
        Usage: {
            Title: "Account Balance",
            SubTitle(used: any, total: any) {
                return `Used this month $${used}, subscription $${total}`;
            },
            IsChecking: "Checking...",
            Check: "Check Again",
            NoAccess: "Enter API Key to check balance",
        },
        AccessCode: {
            Title: "Access Code",
            SubTitle: "Access control enabled",
            Placeholder: "Need Access Code",
        },
        Model: "Модель",
        Temperature: {
            Title: "Рандом",
            SubTitle: "Чем больше значение, тем веселее",
        },
        MaxTokens: {
            Title: "Max Tokens",
            SubTitle: "Maximum length of input tokens and generated tokens",
        },
        PresencePenlty: {
            Title: "Presence Penalty",
            SubTitle:
                "A larger value increases the likelihood to talk about new topics",
        },
    },
    Store: {
        DefaultTopic: "Новый чат",
        BotHello: "Привет, чем я могу быть полезен?",
        Error: "Случилось кое-что ужасное",
        Prompt: {
            History: (content: string) =>
                "This is a summary of the chat history between the AI and the user as a recap: " +
                content,
            Topic:
                "Please generate a four to five word title summarizing our conversation without any lead-in, punctuation, quotation marks, periods, symbols, or additional text. Remove enclosing quotation marks.",
            Summarize:
                "Summarize our discussion briefly in 200 words or less to use as a prompt for future context.",
        },
        ConfirmClearAll: "Confirm to clear all chat and setting data?",
    },
    Copy: {
        Success: "Copied to clipboard",
        Failed: "Copy failed, please grant permission to access clipboard",
    },
    Context: {
        Toast: (x: any) => `With ${x} contextual prompts`,
        Edit: "Contextual and Memory Prompts",
        Add: "Add One",
    },
};

export default ru;
