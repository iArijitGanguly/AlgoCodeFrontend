import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { EvaluationResponse } from '../types/EvaluationDetails';

interface Props {
  response: EvaluationResponse[];
  status: string;
}

const EvaluationResult: React.FC<Props> = ({ response, status }) => {
  const keys = response.length > 0 ? Object.keys(response[0]) : [];

  function handleErrorStatus() {
    let errorStatus = status;
    for (const evaluation of response) {
      if (evaluation.output.toLowerCase() == 'tle') {
        errorStatus = 'Time Limit Exceeded';
        break;
      }
    }
    return errorStatus;
  }

  const customBodyTemplate = (rowData: EvaluationResponse, column: ColumnBodyOptions) => {
    const value = rowData[column.field as keyof EvaluationResponse];
    const style = column.field === 'status' 
            ? value.toLowerCase() == 'success' ? 'text-green-500' : 'text-red-500'
            : '';

    return <span className={style}>{value}</span>;
};

  return (
    <div className="mt-3">
      {status.toLowerCase() == 'success' ? (
        <div className="text-4xl font-bold text-green-500">{status}</div>
      ) : status.toLowerCase() == 'wa' ? (
        <div className="text-4xl font-bold text-red-500">{status}</div>
      ) : (
        <div className="text-4xl font-bold text-red-500">
          {handleErrorStatus()}
        </div>
      )}

      <div className='mt-7'>
        <DataTable value={response} size="large" tableStyle={{ width: '47rem' }}>
            {keys.map((key) => (
                <Column
                    key={key}
                    field={key}
                    align='center'
                    className='text-xl'
                    headerClassName='text-2xl'
                    body={customBodyTemplate}
                    header={key.charAt(0).toUpperCase() + key.slice(1)}
                />
            ))}
        </DataTable>
      </div>
    </div>
  );
};

export default EvaluationResult;
