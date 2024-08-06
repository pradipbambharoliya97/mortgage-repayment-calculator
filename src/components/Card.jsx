import React, { useState } from 'react';
import empty from '../assets/images/illustration-empty.svg';
import calculator from '../assets/images/icon-calculator.svg';
import Input from './Input';
import Radio from './Radio';
import { Controller, useForm } from 'react-hook-form';

const initialValue = {
  amount: '',
  term: '',
  interest: '',
  type: 'Repayment',
};

const initialResult = {
  Repayment: 0,
  'Interest Only': 0,
  total: 0,
};

const Card = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
  });

  const [result, setResult] = useState(initialResult);

  const onSubmit = (data) => {
    const { amount, term, interest } = data;

    const monthelyAmt = amount / (term * 12);
    const intAmt = (amount * (interest / 100) * term) / (term * 12);
    const total = (+amount + amount * (interest / 100) * term).toFixed(2);

    setResult({
      'Interest Only': intAmt.toFixed(2),
      Repayment: (monthelyAmt + intAmt).toFixed(2),
      total,
    });
  };

  return (
    <section className='flex max-md:flex-col rounded-2xl bg-white text-black/80 overflow-hidden m-4 max-w-[95vw] lg:max-w-[75vw] xl:max-w-[50vw]'>
      <div className='p-6 md:w-1/2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold'>Mortgage Calculator</h1>
          <div
            className='font-medium underline underline-offset-1 text-xs text-light-text cursor-pointer hover:text-main-dark transition duration-150'
            onClick={() => {
              reset();
              setResult(initialResult);
            }}
          >
            Clear All
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-4 py-4'
        >
          <Controller
            name='amount'
            control={control}
            rules={{ required: 'The field is required' }}
            render={({ field }) => {
              return (
                <Input
                  label='Mortgage amount'
                  prefix='$'
                  error={errors?.amount?.message}
                  value={field.value}
                  handleChange={(val) => {
                    if (+val > -1) field.onChange(val);
                  }}
                />
              );
            }}
          />
          <div className='flex max-md:flex-col md:items-start gap-4 w-full *:flex-1'>
            <Controller
              name='term'
              control={control}
              rules={{ required: 'The field is required' }}
              render={({ field }) => (
                <Input
                  label='Mortgage Term'
                  prefix='years'
                  value={field.value}
                  error={errors?.term?.message}
                  prefixPosition='right'
                  handleChange={(val) => {
                    if (+val > -1) field.onChange(val);
                  }}
                />
              )}
            />
            <Controller
              name='interest'
              control={control}
              rules={{ required: 'The field is required' }}
              render={({ field }) => (
                <Input
                  label='Interest Rate'
                  prefix='%'
                  error={errors?.interest?.message}
                  value={field.value}
                  prefixPosition='right'
                  handleChange={(val) => {
                    if (+val > -1) field.onChange(val);
                  }}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-2 items-stretch'>
            <label className='text-light-text text-sm font-medium'>
              Mortgage Type
            </label>
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <>
                  <Radio
                    label='Repayment'
                    handleClick={(e) => field.onChange(e)}
                    checked={field.value === 'Repayment'}
                  />

                  <Radio
                    label='Interest Only'
                    handleClick={(e) => field.onChange(e)}
                    checked={field.value === 'Interest Only'}
                  />
                </>
              )}
            />
          </div>
          <button
            type='submit'
            className='bg-lime text-main-dark font-semibold px-6 p-3 text-base rounded-full flex items-center gap-2 justify-center md:max-w-fit hover:bg-lime-light transition duration-150'
          >
            <img src={calculator} alt='' className='w-5 h-5' />
            Calculate Repayments
          </button>
        </form>
      </div>
      <div className='md:w-1/2 bg-main-dark text-white p-6 md:rounded-bl-[3rem]'>
        {result.total === 0 ? (
          <div className='w-full h-full flex flex-col gap-2 items-center justify-center text-center'>
            <img src={empty} alt='' className='w-36 h-36' />
            <p className='text-xl font-semibold'>Results shown here</p>
            <p className='text-sm text-white/50 '>
              Complete the form and click "Calculate repayments" see what your
              monthely repayments would be.
            </p>
          </div>
        ) : (
          <div className='w-full h-full flex flex-col gap-2 '>
            <p className='text-xl font-semibold'>Your results</p>
            <p className='text-sm text-white/50 '>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again.
            </p>

            <div className='border-t-2 border-lime rounded-md w-full p-4 flex items-start gap-4 flex-col mt-4 bg-main-darken'>
              <div>
                <p className='text-white/50 text-sm'>Your monthly repayments</p>
                <p className='text-lime text-4xl font-medium tracking-wide mt-2'>
                  ${result[watch('type')]}
                </p>
              </div>
              <div className='border-t border-white/50 h-px w-full my-4'></div>
              <div>
                <p className='text-white/50 text-sm'>
                  Total you'll repay over the term
                </p>
                <p className='text-xl mt-1'>${result.total}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Card;
