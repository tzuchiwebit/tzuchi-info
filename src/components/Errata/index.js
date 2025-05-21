import { Fragment, useState } from "react"
import styles from './Errata.module.css'
import * as classnames from "classnames"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { pushNotify } from "@/api/api"
import { addErrata } from "@/api/joomlaApi";
import { useParams } from 'next/navigation'
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner"

export default function Errata ({title, className}) {
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const params = useParams();
  const articleId = params.slug.toString()

  const defaultValue = {
    name: '',
    phone: '',
    email: '',
    text: '',
    identity: '',
    honorific: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      ...defaultValue,
    }
  })

  const onSubmit = async (data, e) => {
    await sendErrata(data)
    // reset(defaultValue)
  };

  const sendErrata = async (errataData) => {
    const tempUuid = uuidv4()
    try {
      setIsLoading(true)
      await addErrata({
        articleId,
        reportUuid: tempUuid,
        ...errataData,
      })
      await pushNotify({
        title,
        articleId,
        reportUuid: tempUuid,
        ...errataData,
      }, window.location.href)
      toast.success('已成功送出', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error(err)
      toast.error('送出失敗', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={className}>
      {/* <div className="flex flex-1 text-lg desktop:mb-8 tablet:mb-6 mb-4" /> */}
      <div className="bg-gray-gray9 rounded p-3">
        {
          !isOpen &&
            <div className="flex flex-row justify-end">
              <button className={styles.secondaryBtn} onClick={() => {setIsOpen(true);}}>勘誤回報</button>
            </div>
        }
        <Fragment>
          {
          isOpen &&
            <button className={classnames('w-full', styles.secondaryBtn)} onClick={() => {setIsOpen(false);}}>取消勘誤</button>
          }
          <form className={classnames("mt-4 flex flex-col gap-y-4", styles.drawer, isOpen ? styles.open : styles.close)} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">姓氏*</span>
              <input className={classnames(styles.inputText, errors?.name ? styles.error: '')} placeholder="請輸入姓氏" autoComplete="off"
                {...register('name', {required: {
                  value: true,
                }})}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">稱謂*</span>
              <div className="flex flex-row justify-start gap-x-4">
                <div className="flex flex-row gap-x-1 items-center">
                  <input type="radio" id="mr" name="fav_language" value="mr" className={classnames(styles.genderRadio, errors?.honorific ? styles.error: '')}
                    {...register('honorific', {required: {
                      value: true,
                    }})}
                  />
                  <label htmlFor="mr" className="text-lg font-bold cursor-pointer">先生</label>
                </div>
                <div className="flex flex-row gap-x-1 items-center">
                  <input type="radio" id="ms" name="fav_language" value="ms" className={classnames(styles.genderRadio, errors?.honorific ? styles.error: '')}
                    {...register('honorific', {required: {
                      value: true,
                    }})}
                  />
                  <label htmlFor="ms" className="text-lg font-bold cursor-pointer">小姐</label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">電話*</span>
              <input className={classnames(styles.inputText, errors?.phone ? styles.error: '')} placeholder="請輸入電話" autoComplete="off"
                {...register('phone', {required: {
                  value: true,
                }})}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">Email*</span>
              <input className={classnames(styles.inputText, errors?.email ? styles.error: '')} placeholder="請輸入E-mail" autoComplete="off"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">身份*</span>
              <select className={classnames(styles.inputText, 'py-[5.5px] px-3', errors?.identity ? styles.error: '')}
                {...register('identity', {required: {
                  value: true,
                }})}
              >
                <option value={1}>普通民眾</option>
                <option value={2}>慈濟之友</option>
                <option value={3}>志工</option>
                <option value={4}>職工</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-lg font-bold">勘誤意見*</span>
              <textarea rows={6} className={classnames(styles.inputText, 'resize-none', errors?.text ? styles.error: '')}
                {...register('text', {required: {
                  value: true,
                }})}
              />
            </div>
            <div className="flex flex-row justify-end">
              <div className="grow"></div>
                {
                  isLoading ?
                  <div className="h-[46.5px] w-24 flex justify-center items-center"><Spinner></Spinner></div> :
                  <button type="submit" className="bg-primary-blue2 text-white rounded text-lg py-3 px-4 leading-[22.5px] font-bold">送出</button>
                }
            </div>
          </form>
        </Fragment>
      </div>
    </div>
  )
}
