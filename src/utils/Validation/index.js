import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email Tidak Valid').required('Required').trim(),
  password: Yup
    .string()
    .required('Please Enter your password')
    .trim(),
});

export const signupSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Required'),
  email: Yup.string().email('Email Tidak Valid').required('Required'),
  password: Yup
    .string()
    .required('Please Enter your password')
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  address: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Required'),
  phone_number: Yup.string()
    .trim()
    .min(9, 'No Hp Terlalu Pendek')
    .max(11, 'No Hp Terlalu Panjang')
    .required('Silahkan Isi Nomor Handphone Anda'),
  city: Yup.string().required('Required'),
});

export const updateProfileSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .trim()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
    .trim(),
  phone_number: Yup.string()
    .trim()
    .min(9, 'No Hp Terlalu Pendek')
    .max(11, 'No Hp Terlalu Panjang')
    .required('Silahkan Isi Nomor Handphone Anda'),
});

export const TambahDataSchema = Yup.object().shape({
  namaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Nama Produk'),
  hargaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Harga Produk'),
  kategori_id: Yup
    .array()
    .min(1, 'Kategori minimal satu')
    .required('Silahkan Isi Kategori Produk'),
  deskripsi: Yup.string().required('Silahkan Isi Deskripsi Produk'),
  image: Yup.object().required('Silahkan Isi Gambar Produk'),
});
export const UpdateDataSchema = Yup.object().shape({
  namaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Nama Produk'),
  hargaProduk: Yup.string()
    .trim()
    .required('Silahkan Isi Harga Produk'),
  kategori_id: Yup
    .array()
    .min(1, 'Kategori minimal satu')
    .required('Silahkan Isi Kategori Produk'),
  deskripsi: Yup.string().required('Silahkan Isi Deskripsi Produk'),
});

export const gantiPassSchema = Yup.object().shape({
  current_password: Yup
    .string()
    .required('Please Enter your password')
    .trim(),
  new_password: Yup
    .string()
    .required('Please Enter your password')
    .trim(),
  confirm_password: Yup
    .string()
    .required('Please Enter your password')
    .trim(),
});

export const bidPriceSchema = Yup.object().shape({
  bid_price: Yup.number()
    .typeError('you must specify a number'),
});
