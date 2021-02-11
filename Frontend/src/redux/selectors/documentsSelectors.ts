import { AppStateType } from './../store';
import createDeepEqualSelector from './deepEqualSelector'

const selectDocuments = (state: AppStateType) => state.documents

export const getDocuments = createDeepEqualSelector(
  [selectDocuments],
  (documents: ReturnType<typeof selectDocuments>) => documents.documents
)
