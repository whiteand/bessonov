import { Accessor } from 'solid-js';
import { ITable } from '../../types/Table';

export type CurrentTableContextValue = [Accessor<ITable | null>, (table: ITable | null) => void];
