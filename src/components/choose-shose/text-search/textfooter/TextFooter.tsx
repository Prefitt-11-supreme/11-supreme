import { useNavigate } from 'react-router-dom';
import Button from '../../../common/button/Button';
import { TextFooter_Background } from './textfooter.css';
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useSelectItemStore from '../../../../stores/useSelectItemStore';

const TextFooter = () => {
  const { focus, isSubmit, resetState } = useTextSearchStore();
  const { selectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const navigate = useNavigate();

  const handleNavigate = () => {
    resetState();
    setSelectComplet(true);
    setIsSelected(null);
    navigate('/shoes-registry');
  };
  return (
    <>
      {isSubmit && !focus && (
        <div className={TextFooter_Background}>
          {selectProduct && <Button text="선택 완료" onClick={handleNavigate} type="button" />}
        </div>
      )}
    </>
  );
};
export default TextFooter;
