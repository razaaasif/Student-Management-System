package com.sms.utils;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Query;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import com.sms.entity.Student;

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
			String name  = object.getClass().getSimpleName();
			String querString = "From " + name + " where branch =: branch";
			Query query = session.createQuery(querString).setParameter("branch", st.getBranch());
			System.out.println("Query class" + query.toString());
			Integer idSeq = (query.getResultList().size() + 1) ;
			// String query = "SELECT COUNT(*) FROM student where branch =:branch";
			// Integer idSeq = ((BigInteger)
			// session.createNativeQuery(query).setParameter("branch", st.getBranch())
			// .getSingleResult()).intValue() + 1;

			String id = (idSeq.intValue() < 10 ? "0" + idSeq.intValue() : idSeq.toString());
			
			sb.append(id);
		}
		System.out.println("Id: " + sb.toString());
		return sb.toString();
	}

}
