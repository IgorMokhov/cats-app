import { ChangeEvent } from 'react';
import styles from './CatActions.module.scss';

interface ICatActionsProps {
  isEnabled: boolean;
  isAutoRefresh: boolean;
  isLoading: boolean;
  setIsEnabled: (value: boolean) => void;
  setIsAutoRefresh: (value: boolean) => void;
  getCatHandler: () => void;
}

export const CatActions = ({
  isEnabled,
  isAutoRefresh,
  isLoading,
  setIsEnabled,
  setIsAutoRefresh,
  getCatHandler,
}: ICatActionsProps) => {
  return (
    <div className={styles.actions}>
      <label>
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.target.checked)}
        />
        Enabled
      </label>
      <label>
        <input
          type="checkbox"
          checked={isAutoRefresh}
          disabled={!isEnabled}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAutoRefresh(e.target.checked)}
        />
        Auto-refresh every 5 seconds
      </label>

      <button onClick={getCatHandler} disabled={!isEnabled || isLoading}>
        Get cat
      </button>
    </div>
  );
};
