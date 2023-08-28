import React, { useContext, useMemo } from 'react';

import LimitReqErrorPopUp from '@/features/RepositoryDashboard/components/LimitReqErrorPopUp';
import CommonApiErrorPopUp from '@/features/RepositoryDashboard/components/CommonApiErrorPopUp';
import { RepositoriesListContext } from '@/features/RepositoryDashboard/state/repositoriesList/RepositoriesListContext';
import { ERepoErrorType } from '@/features/RepositoryDashboard/components/ErrorPopUp/RepoError.types';

const ErrorPopUp = () => {
    const { errorDto, removeError } = useContext(RepositoriesListContext);

    const { statusCode } = useMemo(
        () => (errorDto ? { ...errorDto } : { statusCode: null }),
        [errorDto?.statusCode]
    );

    switch (errorDto?.errorType) {
        case ERepoErrorType.LimitReqError:
            return <LimitReqErrorPopUp isLimitReqError={true} removeError={removeError} />;
        case ERepoErrorType.AnyError:
        default:
            return (
                <CommonApiErrorPopUp
                    isError={Boolean(statusCode)}
                    statusCode={statusCode}
                    removeError={removeError}
                />
            );
    }
};

export default ErrorPopUp;