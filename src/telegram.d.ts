// telegram.d.ts

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: "";
        initDataUnsafe: any;
        version: string;
        platform: string;
        colorScheme: string;
        themeParams: NonNullable<unknown>;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        isClosingConfirmationEnabled: boolean;
        BackButton: NonNullable<unknown>;
        MainButton: NonNullable<unknown>;
        SettingsButton: { isVisible: boolean };
        HapticFeedback: NonNullable<unknown>;
        CloudStorage: NonNullable<unknown>;
        BiometricManager: NonNullable<unknown>;
      };
    };
  }
}

export {};
