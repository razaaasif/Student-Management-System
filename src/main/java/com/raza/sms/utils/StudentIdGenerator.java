package com.raza.sms.utils;

import java.io.Serializable;
import java.math.BigInteger;
import java.time.LocalDate;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import com.raza.sms.entity.Student;

public class StudentIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		StringBuilder sb = new StringBuilder();

		if (object instanceof Student) {
			Student st = (Student) object;
			sb.append(st.getBranch());
			sb.append("-");
			sb.append(LocalDate.now().getYear() % 100);
			sb.append("-");
//			Integer idSeq = (session.createQuery("From " + object.getClass().getSimpleName()).getResultList().size() + 1) ;
			String query = "SELECT COUNT(*) FROM student where branch =:branch";
			Integer idSeq = ((BigInteger) session.createNativeQuery(query).setParameter("branch", st.getBranch())
					.getSingleResult()).intValue() + 1;

			String id = (idSeq.intValue() < 10 ? "0" + idSeq.intValue() : idSeq.toString());
			sb.append(id);
		}

		return sb.toString();
	}

}
