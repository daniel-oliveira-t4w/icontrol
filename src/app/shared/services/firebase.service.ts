import { inject, Injectable } from '@angular/core';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { Firestore, collectionData, collection, deleteDoc, query, where, getDocs, updateDoc, doc, addDoc, WhereFilterOp, limit, CollectionReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore = inject(Firestore);

  get<T>(collectionName: string): Observable<T[]> {
    const itemCollection = collection(this.firestore, collectionName);
    return collectionData(itemCollection).pipe() as Observable<T[]>;
  }

  getByFilter<T>(collectionName: string, filters: { field: string; operator: any; value: any }[]) {
    const collectionRef = collection(this.firestore, collectionName) as CollectionReference<T>;

    let q = query(collectionRef);

    filters.forEach(filter => {
      q = query(q, where(filter.field, filter.operator, filter.value));
    });

    return from(
      getDocs(q)
    ).pipe(
      map((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs.map(response => response.data()) as T;
        }
        return [] as T;
      })
    );
  }

  add<T>(collectionName: string, data: T) {
    return from(
      addDoc(collection(this.firestore, collectionName), <any>data)
    ).pipe(
      switchMap(x => {
        return from(
          updateDoc(x, {id: x.id})
        ).pipe(
          map(() => x.id)
        )
      }),

    );
  }

  update<T>(collectionName: string, id: string, data: T) {
    const document = doc(this.firestore, `${collectionName}/${id}`);

    return from(
      updateDoc(document, <any>data)
    );
  }

  delete<T>(collectionName: string, field: string) {
    const document = doc(this.firestore, `${collectionName}/${field}`);

    return from(
      deleteDoc(document)
    );
  }

  getById<T>(collectionName: string, id: string) {
    const collectionRef = collection(this.firestore, collectionName) as CollectionReference<T>;

    const q = query(collectionRef, where('id', '==', id), limit(1));

    return from(
      getDocs(q)
    ).pipe(
      map((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data() as T;
        }
        return null;
      })
    );
  }
}


export interface FilterToFirebase {
  field: string;
  operator: WhereFilterOp;
  value: string;
}
