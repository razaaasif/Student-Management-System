package com.raza.sms.utils;

import java.io.Serializable;
import java.time.LocalDate;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class StudentIdGenerator implements IdentifierGenerator{

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String prefix = "CS-";
		String suffix = "-"+LocalDate.now().getYear() % 100 ;
		Integer idSeq = (session.createQuery("From " + object.getClass().getSimpleName()).getResultList().size() + 1) ;

		String id = prefix  + suffix+ (idSeq.intValue() < 10 ? "0" + idSeq : idSeq.toString());
		System.out.println("Id : " + id);
		return id;
	}

}
