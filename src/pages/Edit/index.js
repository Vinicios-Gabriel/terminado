import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from '../../services/api';

import NavbarUser from '../../components/NavbarUser';
import ModalDiscardEdit from '../../components/ModalDiscardEdit';

import Upload from '../../assets/upload-img.svg';

import './style.css';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState(false);
  const [menssage, setMenssage] = useState('');
  const [controller, setController] = useState(0);
  const [file, setFile] = useState('');
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: 0,
    description: '',
    stock: 0,
    price: 0,
  });
  const [data, setData] = useState({});
  const [modalDiscardEdit, setModalDiscardEdit] = useState(false);

  function handleModalDiscardEdit() {
    return setModalDiscardEdit(!modalDiscardEdit);
  }

  async function handleCategories() {
    try {
      const response = await api.get('/list-categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetDetail() {
    try {
      const response = await api.get(`/list-products/${id}`);
      setData(...response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleForm(e) {
    if (form.description.length >= 2099) {
      setMenssage('* Numero maximo de caracteres da descrição atingido');
      setError(true);
    } else {
      setError(false);
    }

    if (form.title.length >= 199) {
      setMenssage('* Numero maximo de caracteres do tiltulo atingido');
      setError(true);
    } else {
      setError(false);
    }

    const value = e.target.value;
    const name = e.target.name;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!form.title || !form.category || !form.description || !form.stock || !form.price) {
      setMenssage('* Todos os campos devem ser preenchidos');
      setError(true);
      return;
    }

    await handleUpdateProduct();

    return;
  }

  async function handleUpdateProduct() {
    let url = '';
    let path = '';
    if (file) {
      await handleDeleteImg();

      const formData = new FormData();
      formData.append('img', file);

      try {
        const response = await api.post('/upload-img', formData, {
          headers: {
            'Content-Type': 'multpart/form-data',
          },
        });

        url = response.data.url;
        path = response.data.path;
      } catch (error) {
        console.log(error);
      }
    }

    let newValue = 0;

    if (form.price !== data.preco) {
      if (toString(form.price).includes('R$') || form.price.includes('R$')) {
        if (form.price.includes(',')) {
          newValue = form.price.replace(',', '');
          newValue = newValue.split(' ')[1];
        } else {
          newValue = form.price.split(' ')[1];
          newValue = newValue * 100;
        }
      } else if (form.price.includes(',')) {
        newValue = form.price.replace(',', '');
      } else {
        newValue = form.price * 100;
      }
    } else {
      newValue = data.preco;
    }

    let newObj = {};

    if (url) {
      newObj = {
        titulo: form.title,
        estoque: Number(form.stock),
        preco: Number(newValue),
        categoria_id: Number(form.category),
        descricao: form.description,
        url: url,
        path: path,
      };
    } else {
      newObj = {
        titulo: form.title,
        estoque: Number(form.stock),
        preco: Number(newValue),
        categoria_id: Number(form.category),
        descricao: form.description,
      };
    }

    try {
      await api.put(`/products/${id}`, newObj, {
        headers: {
          Authorization: `Bearer ${getItem('token')}`,
        },
      });
      navigate('/products');
    } catch (error) {
      console.log(error);
    }

    return;
  }

  async function handleDeleteImg() {
    if (!file) {
      return;
    }
    try {
      await api.delete(`/delete-img/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePreviewFile() {
    const preview = document.querySelector('.preview');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (controller === 2) {
      return;
    }

    setController(controller + 1);
    const inputTitle = document.querySelector('#title');
    const select = document.querySelector('#category');
    const inputDescription = document.querySelector('#description');
    const inputPrice = document.querySelector('#price');
    const inputStock = document.querySelector('#stock');
    const preview = document.querySelector('.preview');

    handleGetDetail();
    handleCategories();

    const value = (data.preco / 100).toFixed(2);
    inputTitle.value = data.titulo;
    select.value = data.categoria_id;
    inputDescription.value = data.descricao;
    inputPrice.value = value;
    inputStock.value = data.estoque;
    preview.src = data.url;

    setForm({
      title: data.titulo,
      category: data.categoria_id,
      description: data.descricao,
      stock: data.estoque,
      price: data.preco,
    });
  }, [data]);
  return (
    <div className="container-body-products ">
      {modalDiscardEdit && <ModalDiscardEdit functionClose={handleModalDiscardEdit} />}
      <NavbarUser route={'/products'} />
      <form onSubmit={handleSubmit}>
        <div className="container-product-add-edit display-flex flex-column">
          <div>
            <h1>Adicionar novo produto</h1>
            {error && <span className="error">{menssage}</span>}
            <div className="container-title display-flex">
              <div className="container-input-title display-flex flex-column">
                <label htmlFor="">Título</label>
                <input id="title" name="title" className="input-title" type="text" onChange={e => handleForm(e)} />
                <h4 className="counter-title">{`${form.title ? form.title.length : 0}/200`}</h4>
              </div>
              <div className="display-flex flex-column">
                <label htmlFor="categories">Categoria</label>
                <select className="select-categories" name="category" id="category" onChange={e => handleForm(e)}>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="display-flex flex-column">
              <label htmlFor="description">Descrição do produto </label>
              <textarea
                className="input-description"
                type="text"
                id="description"
                name="description"
                onChange={e => handleForm(e)}
                cols="30"
                rows="10"
              ></textarea>
              <h4 className="counter-description">{`${form.description ? form.description.length : 0}/2100`}</h4>
            </div>
            <div className="container-price display-flex">
              <div className="display-flex flex-column">
                <label htmlFor="">Preço</label>
                <input id="price" name="price" className="input-values input-price" type="number" onChange={e => handleForm(e)} />
              </div>
              <div className="display-flex flex-column">
                <label htmlFor="">Estoque</label>
                <input id="stock" name="stock" className="input-values" type="number" onChange={e => handleForm(e)} />
              </div>
            </div>

            <div className="display-flex flex-column">
              <label htmlFor="dropzone-file" className="dropzone-file cursor-pointer">
                Adicionar foto
                <div className="input-file">
                  <img className="preview" src={Upload} alt="" />
                </div>
                <span>{file ? file.name : ' '}</span>
                <input
                  className="hidden"
                  id="dropzone-file"
                  name="dropzone-file"
                  type="file"
                  onChange={e => {
                    e.preventDefault();
                    setFile(e.target.files[0]);
                    handlePreviewFile();
                  }}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="display-flex">
          <button className="btn-post">Publicar anúncio</button>

          <button
            className="btn-cancel"
            type="button"
            onClick={() => {
              handleModalDiscardEdit();
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
